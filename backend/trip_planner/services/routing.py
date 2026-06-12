import os
import requests
from django.conf import settings

class RoutingError(ValueError):
    pass

def get_route(origin: dict, destination: dict) -> dict:
    
    api_key = os.getenv('ORS_API_KEY')
    if not api_key:
        raise RoutingError("ORS_API_KEY environment variable is not set")
        
    url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"
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
        
        ors_coords = feature['geometry']['coordinates']
        polyline = [[coord[1], coord[0]] for coord in ors_coords]
        
        return {
            "distance_miles": distance_meters * 0.000621371,
            "duration_hours": duration_seconds / 3600.0,
            "polyline": polyline
        }
        
    except requests.RequestException as e:
        import math
        def haversine(lat1, lon1, lat2, lon2):
            R = 3958.8
            dLat = math.radians(lat2 - lat1)
            dLon = math.radians(lon2 - lon1)
            a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            return R * c
            
        dist_miles = haversine(origin['lat'], origin['lng'], destination['lat'], destination['lng']) * 1.2
        return {
            "distance_miles": dist_miles,
            "duration_hours": dist_miles / 50.0,
            "polyline": [[origin['lat'], origin['lng']], [destination['lat'], destination['lng']]]
        }