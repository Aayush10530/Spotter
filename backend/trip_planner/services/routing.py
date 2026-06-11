import os
import requests
from django.conf import settings

class RoutingError(ValueError):
    pass

def get_route(origin: dict, destination: dict) -> dict:
    """
    Get routing information between two coordinates.
    
    Args:
        origin: {"name": str, "lat": float, "lng": float}
        destination: {"name": str, "lat": float, "lng": float}
        
    Returns:
        {
            "distance_miles": float,
            "duration_hours": float,
            "polyline": [[lat, lng], ...]
        }
    """
    api_key = os.getenv('ORS_API_KEY')
    if not api_key:
        raise RoutingError("ORS_API_KEY environment variable is not set")
        
    url = "https://api.openrouteservice.org/v2/directions/driving-hgv/geojson"
    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json"
    }
    
    body = {
        "coordinates": [
            [origin['lng'], origin['lat']],
            [destination['lng'], destination['lat']]
        ]
    }
    
    try:
        response = requests.post(url, json=body, headers=headers, timeout=10)
        # Fallback to driving-car if driving-hgv is not available on free tier
        if response.status_code in (400, 403, 404):
            url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"
            response = requests.post(url, json=body, headers=headers, timeout=10)
            
        response.raise_for_status()
        data = response.json()
        
        if 'features' not in data or not data['features']:
            raise RoutingError("Route could not be found.")
            
        feature = data['features'][0]
        properties = feature['properties']
        segments = properties.get('segments', [])
        
        if not segments:
            raise RoutingError("Route segments missing.")
            
        distance_meters = segments[0]['distance']
        duration_seconds = segments[0]['duration']
        
        # Convert coordinates from [lng, lat] to [lat, lng]
        ors_coords = feature['geometry']['coordinates']
        polyline = [[coord[1], coord[0]] for coord in ors_coords]
        
        return {
            "distance_miles": distance_meters * 0.000621371,
            "duration_hours": duration_seconds / 3600.0,
            "polyline": polyline
        }
        
    except requests.RequestException as e:
        raise RoutingError(f"Routing API request failed: {str(e)}")
