# HOS Test Cases

## TEST CASE 1 — Short same-day trip
Input:
  current_location:  Chicago, IL
  pickup_location:   Indianapolis, IN
  dropoff_location:  Columbus, OH
  cycle_hours_used:  0

Expected output:
  total_days:        1
  total_miles:       ~350
  fuel_stops:        0 (under 1000 miles)
  log_sheets:        1
  each day = 24 hrs: YES

Expected Day 1 blocks:
  off_duty      0.0  → 6.0   = 6.0 hrs
  on_duty_nd    6.0  → 7.0   = 1.0 hrs  (pre-trip)
  driving       7.0  → 11.0  = 4.0 hrs  (to Indianapolis)
  on_duty_nd    11.0 → 12.0  = 1.0 hrs  (pickup)
  driving       12.0 → 15.0  = 3.0 hrs  (to Columbus)
  on_duty_nd    15.0 → 16.0  = 1.0 hrs  (dropoff)
  off_duty      16.0 → 24.0  = 8.0 hrs  (rest)
  ──────────────────────────────────────
  TOTAL                      = 24.0 hrs ✓

---

## TEST CASE 2 — Multi-day medium trip
Input:
  current_location:  Chicago, IL
  pickup_location:   Dallas, TX
  dropoff_location:  Atlanta, GA
  cycle_hours_used:  22

Expected output:
  total_days:        3
  total_miles:       ~1842
  fuel_stops:        2
  log_sheets:        3
  each day = 24 hrs: YES

Expected behavior:
  Day 1: Drive toward Dallas
         30-min break after 8 hrs driving
         10-hr sleeper berth rest
  Day 2: Arrive Dallas, pickup (1 hr on duty)
         Drive toward Atlanta
         Fuel stop somewhere after 1000 mi
         10-hr sleeper berth rest
  Day 3: Arrive Atlanta, dropoff (1 hr on duty)
         Remaining time off duty

---

## TEST CASE 3 — Cycle hours near limit
Input:
  current_location:  Los Angeles, CA
  pickup_location:   Phoenix, AZ
  dropoff_location:  Denver, CO
  cycle_hours_used:  62

Expected output:
  cycle_hours_remaining: 8
  Driver has only 8 hrs left in 70-hr cycle
  App must handle this without crashing
  Either complete trip within 8 hrs
  Or return clear error explaining cycle limit

---

## VALIDATION RULE — applies to ALL test cases
For every single day in every test case:
  sum of all time_block durations = exactly 24.0 hours
  If any day != 24.0 → bug in hos_calculator.py
