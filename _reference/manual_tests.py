# _reference/manual_tests.py
# Run after every backend file is built
# python _reference/manual_tests.py

import sys
import os

# Point to your backend folder
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

import django
django.setup()

# ─────────────────────────────────────────────
# PHASE 3 TESTS — geocoding.py
# ─────────────────────────────────────────────

print("\n=== PHASE 3: geocoding.py ===")

try:
    from trip_planner.services.geocoding import geocode_location

    # Test 1: Chicago
    chicago = geocode_location("Chicago, IL")
    assert 41.0 < chicago['lat'] < 42.5, f"Bad lat: {chicago['lat']}"
    assert -88.5 < chicago['lng'] < -87.0, f"Bad lng: {chicago['lng']}"
    print(f"  [PASS] Chicago: {chicago}")

    # Test 2: Dallas
    dallas = geocode_location("Dallas, TX")
    assert 32.0 < dallas['lat'] < 33.5, f"Bad lat: {dallas['lat']}"
    assert -97.5 < dallas['lng'] < -96.0, f"Bad lng: {dallas['lng']}"
    print(f"  [PASS] Dallas: {dallas}")

    # Test 3: Atlanta
    atlanta = geocode_location("Atlanta, GA")
    assert 33.0 < atlanta['lat'] < 34.5, f"Bad lat: {atlanta['lat']}"
    assert -85.0 < atlanta['lng'] < -84.0, f"Bad lng: {atlanta['lng']}"
    print(f"  [PASS] Atlanta: {atlanta}")

    # Test 4: Invalid city
    try:
        bad = geocode_location("NotARealCity, XX")
        print(f"  [FAIL] Should have raised ValueError for invalid city")
    except ValueError:
        print(f"  [PASS] Correctly raises ValueError for invalid city")

    print("  PHASE 3 PASSED\n")

except ImportError as e:
    print(f"  [FAIL] Import error: {e}")
except AssertionError as e:
    print(f"  [FAIL] Assertion failed: {e}")
except Exception as e:
    print(f"  [FAIL] Unexpected error: {e}")


# ─────────────────────────────────────────────
# PHASE 4 TESTS — routing.py
# ADD AFTER routing.py IS BUILT
# ─────────────────────────────────────────────

print("\n=== PHASE 4: routing.py ===")

from trip_planner.services.routing import get_route
chicago = geocode_location("Chicago, IL")
dallas  = geocode_location("Dallas, TX")
route   = get_route(chicago, dallas)
assert 850  < route['distance_miles'] < 1000
assert 12.0 < route['duration_hours'] < 24.0
assert len(route['polyline']) > 10
print(f"  [PASS] Chicago->Dallas: {route['distance_miles']:.0f} mi")
print(f"  [PASS] Duration: {route['duration_hours']:.1f} hrs")
print("  PHASE 4 PASSED\n")


# ─────────────────────────────────────────────
# PHASE 5 TESTS — hos_calculator.py
# ADD AFTER hos_calculator.py IS BUILT
# ─────────────────────────────────────────────

# Uncomment when hos_calculator.py is built

print("\n=== PHASE 5: hos_calculator.py ===")
from trip_planner.services.hos_calculator import calculate_trip
from trip_planner.services.routing import get_route

chicago = geocode_location("Chicago, IL")
dallas  = geocode_location("Dallas, TX")
atlanta = geocode_location("Atlanta, GA")

deadhead = get_route(chicago, dallas)
loaded   = get_route(dallas, atlanta)

result = calculate_trip(
    origin_coords=chicago,
    pickup_coords=dallas,
    dropoff_coords=atlanta,
    deadhead_route=deadhead,
    loaded_route=loaded,
    cycle_hours_used=22
)

# Validate every day totals 24 hours
for day in result['days']:
    total = sum(
        b['end_hour'] - b['start_hour']
        for b in day['time_blocks']
    )
    assert abs(total - 24.0) < 0.01, \
        f"Day {day['day_number']} = {total} hrs not 24.0"
    print(f"  [PASS] Day {day['day_number']}: {total:.1f} hrs")

print(f"  [PASS] Total days: {result['summary']['total_days']}")
print(f"  [PASS] Total miles: {result['summary']['total_miles']}")
print("  PHASE 5 PASSED\n")


print("\n=== PHASE 6: log_builder.py ===")
from trip_planner.services.log_builder import LogSheetBuilder

final_output = LogSheetBuilder.build(
    origin_coords=chicago,
    pickup_coords=dallas,
    dropoff_coords=atlanta,
    deadhead_route=deadhead,
    loaded_route=loaded,
    trip_data=result
)

assert 'summary' in final_output
assert 'route' in final_output
assert 'days' in final_output
assert len(final_output['route']['waypoints']) >= 3
print(f"  [PASS] Final output generated with {len(final_output['route']['waypoints'])} waypoints")
print("  PHASE 6 PASSED\n")

print("\n=== PHASE 7: serializers.py ===")
from trip_planner.serializers import TripInputSerializer

data_valid = {
    'current_location': 'Chicago, IL',
    'pickup_location': 'Dallas, TX',
    'dropoff_location': 'Atlanta, GA',
    'cycle_hours_used': 22.5
}
serializer = TripInputSerializer(data=data_valid)
assert serializer.is_valid(), serializer.errors
print("  [PASS] Valid data accepted")

data_invalid = {
    'current_location': 'Chicago, IL',
    'cycle_hours_used': 80.0
}
serializer_invalid = TripInputSerializer(data=data_invalid)
assert not serializer_invalid.is_valid()
assert 'pickup_location' in serializer_invalid.errors
assert 'cycle_hours_used' in serializer_invalid.errors
print("  [PASS] Invalid data rejected correctly")
print("  PHASE 7 PASSED\n")

print("=== ALL ACTIVE TESTS PASSED ===\n")
