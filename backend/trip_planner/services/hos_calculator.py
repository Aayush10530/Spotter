def validate_day(day: dict) -> bool:
    """
    Validates that all time blocks in a day
    sum to exactly 24.0 hours.
    Raises ValueError if they do not.
    Call this before returning any day in the output.
    """
    total = sum(
        block['end_hour'] - block['start_hour']
        for block in day['time_blocks']
    )
    if abs(total - 24.0) > 0.01:
        raise ValueError(
            f"Day {day['day_number']} time blocks "
            f"sum to {total:.2f} hours, not 24.0. "
            f"Blocks: {day['time_blocks']}"
        )
    return True


def split_block_at_midnight(block: dict, day_number: int) -> list:
    """
    If a block crosses midnight (end_hour > 24),
    split it into two blocks:
      - First block: start_hour to 24.0 (current day)
      - Second block: 0.0 to remainder (next day)
    
    Example:
      Input:  {start_hour: 18.5, end_hour: 28.5}
      Output: [
        {start_hour: 18.5, end_hour: 24.0},  # day N
        {start_hour: 0.0,  end_hour: 4.5}    # day N+1
      ]
    """
    if block['end_hour'] <= 24.0:
        return [block]
    
    first_part = {**block, 'end_hour': 24.0}
    second_part = {
        **block,
        'start_hour': 0.0,
        'end_hour': block['end_hour'] - 24.0,
        'day_number': day_number + 1
    }
    return [first_part] + split_block_at_midnight(second_part, day_number + 1)

import math
from trip_planner.constants import *

class HOSSimulator:
    def __init__(self, cycle_hours_used: float, origin_name: str = "Origin"):
        self.current_time = 0.0
        self.current_day = 1
        self.days = []
        self.current_day_blocks = []
        self.current_day_remarks = []
        
        self.drive_time_since_rest = 0.0
        self.duty_time_since_rest = 0.0
        self.drive_time_since_break = 0.0
        self.miles_since_fuel = 0.0
        self.cycle_hours = cycle_hours_used
        
        self.total_miles = 0.0
        self.miles_today = 0.0
        self.total_drive_hours = 0.0
        self.total_fuel_stops = 0
        
        self.add_block(OFF_DUTY, DAY_START_HOUR, origin_name, None)

    def format_time(self, hour: float) -> str:
        h = int(hour)
        m = int(round((hour - h) * 60))
        if m == 60:
            h += 1
            m = 0
        period = "AM"
        if h >= 12:
            period = "PM"
        display_h = h % 12
        if display_h == 0:
            display_h = 12
        return f"{display_h}:{m:02d} {period}"

    def finish_day(self):
        totals = {
            OFF_DUTY: 0.0,
            SLEEPER_BERTH: 0.0,
            DRIVING: 0.0,
            ON_DUTY_ND: 0.0,
            'total_working': 0.0
        }
        for b in self.current_day_blocks:
            duration = b['end_hour'] - b['start_hour']
            totals[b['status']] += duration
            if b['status'] in [DRIVING, ON_DUTY_ND]:
                totals['total_working'] += duration
                
        day_obj = {
            'day_number': self.current_day,
            'date_label': f"Day {self.current_day}",
            'total_miles': round(self.miles_today),
            'time_blocks': self.current_day_blocks.copy(),
            'remarks': self.current_day_remarks.copy(),
            'totals': totals
        }
        
        validate_day(day_obj)
        self.days.append(day_obj)
        self.current_day += 1
        self.current_day_blocks = []
        self.current_day_remarks = []
        self.miles_today = 0.0

    def add_block(self, status: str, duration: float, location: str, remark: str, activity: str = None):
        if duration <= 0:
            return

        start_hour = self.current_time
        end_hour = start_hour + duration
        
        block = {
            'status': status,
            'start_hour': start_hour,
            'end_hour': end_hour,
            'location': location,
            'remark': remark
        }
        
        if activity:
            self.current_day_remarks.append({
                'time_label': self.format_time(start_hour),
                'location': location,
                'activity': activity
            })
            
        parts = split_block_at_midnight(block, self.current_day)
        
        for part in parts:
            self.current_day_blocks.append(part)
            if part['end_hour'] >= 24.0:
                self.finish_day()
            
        self.current_time = (self.current_time + duration) % 24.0
        
        if status in [DRIVING, ON_DUTY_ND]:
            self.duty_time_since_rest += duration
            self.cycle_hours += duration
        if status == DRIVING:
            self.drive_time_since_rest += duration
            self.drive_time_since_break += duration
            self.total_drive_hours += duration
        if status == SLEEPER_BERTH and duration >= MIN_REST_HOURS:
            self.drive_time_since_rest = 0.0
            self.duty_time_since_rest = 0.0
            self.drive_time_since_break = 0.0
        if status == OFF_DUTY and duration >= 34.0:
            self.cycle_hours = 0.0

    def drive_leg(self, distance_miles: float, duration_hours: float, origin_name: str):
        speed = distance_miles / duration_hours if duration_hours > 0 else 60.0
        remaining_time = duration_hours
        
        while remaining_time > 0.01:
            if self.cycle_hours >= MAX_CYCLE_HOURS:
                raise ValueError(f"{MAX_CYCLE_HOURS}-hour cycle limit reached. Driver must take a 34-hour restart.")
                
            time_to_11 = MAX_DRIVING_HOURS - self.drive_time_since_rest
            time_to_14 = MAX_WINDOW_HOURS - self.duty_time_since_rest
            time_to_8 = BREAK_AFTER_HOURS - self.drive_time_since_break
            time_to_fuel = (FUEL_INTERVAL_MILES - self.miles_since_fuel) / speed
            
            drive_chunk = min(remaining_time, time_to_11, time_to_14, time_to_8, time_to_fuel)
            
            if drive_chunk > 0:
                self.add_block(DRIVING, drive_chunk, origin_name, "Driving", "Begin driving" if remaining_time == duration_hours else "Resume driving")
                remaining_time -= drive_chunk
                dist_chunk = drive_chunk * speed
                self.miles_today += dist_chunk
                self.total_miles += dist_chunk
                self.miles_since_fuel += dist_chunk
                
            if remaining_time <= 0.01:
                break
                
            if self.miles_since_fuel >= FUEL_INTERVAL_MILES - 0.1:
                self.add_block(ON_DUTY_ND, FUEL_STOP_DURATION_HOURS, origin_name, "Fueling stop", "Fueling stop")
                self.total_fuel_stops += 1
                self.miles_since_fuel = 0.0
                self.drive_time_since_break = 0.0
                continue
                
            if self.drive_time_since_rest >= MAX_DRIVING_HOURS - 0.01 or self.duty_time_since_rest >= MAX_WINDOW_HOURS - 0.01:
                self.add_block(SLEEPER_BERTH, MIN_REST_HOURS, origin_name, "10-hr sleeper berth rest", "10-hr sleeper berth rest")
                continue
                
            if self.drive_time_since_break >= BREAK_AFTER_HOURS - 0.01:
                self.add_block(OFF_DUTY, 0.5, origin_name, "Mandatory 30-min break", "Mandatory 30-min break")
                self.drive_time_since_break = 0.0
                continue

    def end_trip(self, location: str):
        """
        Pads the final day to exactly 24 hours with off_duty
        then finalizes the last day's log sheet.
        """
        remaining = (24.0 - self.current_time) % 24.0
        if remaining > 0.01:
            self.add_block(
                OFF_DUTY,
                remaining,
                location,
                "End of trip",
                "Off duty — trip complete"
            )
        if self.current_day_blocks:
            self.finish_day()

def calculate_trip(
    origin_coords: dict,
    pickup_coords: dict,
    dropoff_coords: dict,
    deadhead_route: dict,
    loaded_route: dict,
    cycle_hours_used: float = 0.0
) -> dict:
    sim = HOSSimulator(cycle_hours_used, origin_coords['name'])
    
    sim.add_block(ON_DUTY_ND, PRE_TRIP_DURATION_HOURS, origin_coords['name'], "Pre-trip inspection", "Pre-trip inspection")
    
    sim.drive_leg(deadhead_route['distance_miles'], deadhead_route['duration_hours'], origin_coords['name'])
    
    sim.add_block(ON_DUTY_ND, PICKUP_DURATION_HOURS, pickup_coords['name'], "Pickup / load", "Pickup / load")
    
    sim.drive_leg(loaded_route['distance_miles'], loaded_route['duration_hours'], pickup_coords['name'])
    
    sim.add_block(ON_DUTY_ND, DROPOFF_DURATION_HOURS, dropoff_coords['name'], "Dropoff / unload", "Dropoff / unload")
    
    sim.end_trip(dropoff_coords['name'])
    
    return {
        "summary": {
            "total_miles": round(sim.total_miles),
            "total_days": len(sim.days),
            "total_drive_hours": round(sim.total_drive_hours, 1),
            "total_fuel_stops": sim.total_fuel_stops,
            "cycle_hours_remaining": round(MAX_CYCLE_HOURS - sim.cycle_hours, 1)
        },
        "days": sim.days
    }
