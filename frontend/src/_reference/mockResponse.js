// frontend/src/_reference/mockResponse.js
// USE DURING FRONTEND DEVELOPMENT
// Prevents needing backend running while building UI
// 
// To enable: set REACT_APP_USE_MOCK=true in .env
// To disable: set REACT_APP_USE_MOCK=false in .env

export const MOCK_TRIP_RESPONSE = {
  summary: {
    total_miles: 1842,
    total_days: 3,
    total_drive_hours: 28.5,
    total_fuel_stops: 2,
    cycle_hours_remaining: 26
  },
  route: {
    polyline: [
      [41.8781, -87.6298],
      [39.7392, -89.6417],
      [38.6270, -90.1994],
      [35.1495, -90.0490],
      [32.7767, -96.7970],
      [32.5252, -93.7502],
      [33.4484, -86.8025],
      [33.7490, -84.3880]
    ],
    waypoints: [
      {
        type: "start",
        name: "Chicago, IL",
        lat: 41.8781,
        lng: -87.6298,
        time_label: "6:00 AM",
        activity: "Pre-trip inspection",
        duration: "1 hr",
        day: 1
      },
      {
        type: "break",
        name: "Springfield, IL",
        lat: 39.7392,
        lng: -89.6417,
        time_label: "3:00 PM",
        activity: "Mandatory 30-min break",
        duration: "30 min",
        day: 1
      },
      {
        type: "rest",
        name: "Memphis, TN",
        lat: 35.1495,
        lng: -90.0490,
        time_label: "6:30 PM",
        activity: "10-hr sleeper berth rest",
        duration: "10 hrs",
        day: 1
      },
      {
        type: "pickup",
        name: "Dallas, TX",
        lat: 32.7767,
        lng: -96.7970,
        time_label: "8:00 AM",
        activity: "Pickup / load",
        duration: "1 hr",
        day: 2
      },
      {
        type: "fuel",
        name: "Shreveport, LA",
        lat: 32.5252,
        lng: -93.7502,
        time_label: "11:30 AM",
        activity: "Fueling stop",
        duration: "30 min",
        day: 2
      },
      {
        type: "rest",
        name: "Birmingham, AL",
        lat: 33.4484,
        lng: -86.8025,
        time_label: "7:00 PM",
        activity: "10-hr sleeper berth rest",
        duration: "10 hrs",
        day: 2
      },
      {
        type: "dropoff",
        name: "Atlanta, GA",
        lat: 33.7490,
        lng: -84.3880,
        time_label: "9:00 AM",
        activity: "Dropoff / unload",
        duration: "1 hr",
        day: 3
      }
    ]
  },
  days: [
    {
      day_number: 1,
      date_label: "Day 1",
      total_miles: 550,
      time_blocks: [
        {
          status: "off_duty",
          start_hour: 0,
          end_hour: 6.0,
          location: "Chicago, IL",
          remark: null
        },
        {
          status: "on_duty_nd",
          start_hour: 6.0,
          end_hour: 7.0,
          location: "Chicago, IL",
          remark: "Pre-trip inspection"
        },
        {
          status: "driving",
          start_hour: 7.0,
          end_hour: 15.0,
          location: "Chicago, IL",
          remark: "Driving"
        },
        {
          status: "off_duty",
          start_hour: 15.0,
          end_hour: 15.5,
          location: "Springfield, IL",
          remark: "Mandatory 30-min break"
        },
        {
          status: "driving",
          start_hour: 15.5,
          end_hour: 18.5,
          location: "Springfield, IL",
          remark: "Driving"
        },
        {
          status: "sleeper_berth",
          start_hour: 18.5,
          end_hour: 24.0,
          location: "Memphis, TN",
          remark: "10-hr rest begins"
        }
      ],
      remarks: [
        {
          time_label: "6:00 AM",
          location: "Chicago, IL",
          activity: "Pre-trip inspection"
        },
        {
          time_label: "7:00 AM",
          location: "Chicago, IL",
          activity: "Begin driving"
        },
        {
          time_label: "3:00 PM",
          location: "Springfield, IL",
          activity: "Mandatory 30-min break"
        },
        {
          time_label: "3:30 PM",
          location: "Springfield, IL",
          activity: "Resume driving"
        },
        {
          time_label: "6:30 PM",
          location: "Memphis, TN",
          activity: "10-hr sleeper berth rest"
        }
      ],
      totals: {
        off_duty: 6.5,
        sleeper_berth: 5.5,
        driving: 11.0,
        on_duty_nd: 1.0,
        total_working: 12.0
      }
    },
    {
      day_number: 2,
      date_label: "Day 2",
      total_miles: 812,
      time_blocks: [
        {
          status: "sleeper_berth",
          start_hour: 0,
          end_hour: 4.5,
          location: "Memphis, TN",
          remark: "10-hr rest continues"
        },
        {
          status: "driving",
          start_hour: 4.5,
          end_hour: 9.5,
          location: "Memphis, TN",
          remark: "Driving"
        },
        {
          status: "on_duty_nd",
          start_hour: 9.5,
          end_hour: 10.5,
          location: "Dallas, TX",
          remark: "Pickup / load"
        },
        {
          status: "driving",
          start_hour: 10.5,
          end_hour: 14.5,
          location: "Dallas, TX",
          remark: "Driving"
        },
        {
          status: "on_duty_nd",
          start_hour: 14.5,
          end_hour: 15.0,
          location: "Shreveport, LA",
          remark: "Fueling stop"
        },
        {
          status: "driving",
          start_hour: 15.0,
          end_hour: 19.0,
          location: "Shreveport, LA",
          remark: "Driving"
        },
        {
          status: "sleeper_berth",
          start_hour: 19.0,
          end_hour: 24.0,
          location: "Birmingham, AL",
          remark: "10-hr rest begins"
        }
      ],
      remarks: [
        {
          time_label: "4:30 AM",
          location: "Memphis, TN",
          activity: "Resume driving after rest"
        },
        {
          time_label: "9:30 AM",
          location: "Dallas, TX",
          activity: "Pickup / load"
        },
        {
          time_label: "10:30 AM",
          location: "Dallas, TX",
          activity: "Begin driving loaded"
        },
        {
          time_label: "2:30 PM",
          location: "Shreveport, LA",
          activity: "Fueling stop"
        },
        {
          time_label: "3:00 PM",
          location: "Shreveport, LA",
          activity: "Resume driving"
        },
        {
          time_label: "7:00 PM",
          location: "Birmingham, AL",
          activity: "10-hr sleeper berth rest"
        }
      ],
      totals: {
        off_duty: 0,
        sleeper_berth: 9.5,
        driving: 13.0,
        on_duty_nd: 1.5,
        total_working: 14.5
      }
    },
    {
      day_number: 3,
      date_label: "Day 3",
      total_miles: 160,
      time_blocks: [
        {
          status: "sleeper_berth",
          start_hour: 0,
          end_hour: 5.0,
          location: "Birmingham, AL",
          remark: "10-hr rest continues"
        },
        {
          status: "driving",
          start_hour: 5.0,
          end_hour: 7.5,
          location: "Birmingham, AL",
          remark: "Driving"
        },
        {
          status: "on_duty_nd",
          start_hour: 7.5,
          end_hour: 8.5,
          location: "Atlanta, GA",
          remark: "Dropoff / unload"
        },
        {
          status: "off_duty",
          start_hour: 8.5,
          end_hour: 24.0,
          location: "Atlanta, GA",
          remark: "End of trip"
        }
      ],
      remarks: [
        {
          time_label: "5:00 AM",
          location: "Birmingham, AL",
          activity: "Resume driving after rest"
        },
        {
          time_label: "7:30 AM",
          location: "Atlanta, GA",
          activity: "Dropoff / unload"
        },
        {
          time_label: "8:30 AM",
          location: "Atlanta, GA",
          activity: "Off duty — trip complete"
        }
      ],
      totals: {
        off_duty: 15.5,
        sleeper_berth: 5.0,
        driving: 2.5,
        on_duty_nd: 1.0,
        total_working: 3.5
      }
    }
  ]
}
