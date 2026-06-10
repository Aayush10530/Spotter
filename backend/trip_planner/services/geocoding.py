import os
import requests
from django.conf import settings

class GeocodingError(ValueError):
    pass

def geocode_location(city_name: str) -> dict:
    """
    Convert a location string to lat/lng coordinates.

    Args:
        city_name: Human-readable location e.g. "Chicago, IL"

    Returns:
        {"name": str, "lat": float, "lng": float}

    Raises:
        GeocodingError: If location cannot be resolved
    """
    api_key = os.getenv('ORS_API_KEY')
    if not api_key:
        raise GeocodingError("ORS_API_KEY environment variable is not set")

    url = "https://api.openrouteservice.org/geocode/search"
    params = {
        "api_key": api_key,
        "text": city_name,
        "size": 1
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if not data.get('features'):
            raise GeocodingError(f"Location not found: {city_name}")
            
        feature = data['features'][0]
        coords = feature['geometry']['coordinates']
        
        return {
            "name": city_name,
            "lat": coords[1],
            "lng": coords[0]
        }
    except requests.RequestException as e:
        raise GeocodingError(f"Geocoding API request failed: {str(e)}")
