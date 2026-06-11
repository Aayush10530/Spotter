import os
from dotenv import load_dotenv

# Load .env before importing service
load_dotenv()

from trip_planner.services.geocoding import geocode_location, GeocodingError

def main():
    print("Testing geocode_location('Chicago, IL')...")
    try:
        result = geocode_location('Chicago, IL')
        print("Success:", result)
    except GeocodingError as e:
        print("GeocodingError:", e)

if __name__ == "__main__":
    main()
