import requests
import json

url = "http://127.0.0.1:8000/api/plan-trip/"
payload = {
    "current_location": "Chicago, IL",
    "pickup_location": "Dallas, TX",
    "dropoff_location": "Atlanta, GA",
    "cycle_hours_used": 0.0
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    data = response.json()
    if response.status_code == 200:
        waypoints = data.get('route', {}).get('waypoints', [])
        print(f"Found {len(waypoints)} waypoints.")
        for w in waypoints:
            print(f"- {w.get('type')}: {w.get('name')} at {w.get('time_label')} (Day {w.get('day')})")
        
        # Check for NaNs or errors
        print("\nSummary:")
        print(json.dumps(data.get('summary'), indent=2))
        print("Test passed successfully.")
    else:
        print("Error Response:")
        print(json.dumps(data, indent=2))
except Exception as e:
    print(f"Failed to connect or parse response: {e}")
