class LogSheetBuilder:
    @staticmethod
    def build(origin_coords: dict, pickup_coords: dict, dropoff_coords: dict, deadhead_route: dict, loaded_route: dict, trip_data: dict) -> dict:
        """
        Merges route and scheduling data into the final API response schema.
        """
        # Combine the polylines
        polyline = deadhead_route['polyline'] + loaded_route['polyline']
        
        # Build base waypoints
        waypoints = []
        
        # Helper to find when an activity occurred in trip_data
        def find_activity(activity_name):
            for day in trip_data['days']:
                for remark in day['remarks']:
                    if remark['activity'] == activity_name:
                        return remark['time_label'], day['day_number']
            return "", 0
            
        start_time, start_day = find_activity("Pre-trip inspection")
        pickup_time, pickup_day = find_activity("Pickup / load")
        dropoff_time, dropoff_day = find_activity("Dropoff / unload")
        
        waypoints.append({
            'type': 'start',
            'name': origin_coords['name'],
            'lat': origin_coords['lat'],
            'lng': origin_coords['lng'],
            'time_label': start_time or '6:00 AM',
            'activity': 'Pre-trip inspection',
            'duration': '1 hr',
            'day': start_day or 1
        })
        
        waypoints.append({
            'type': 'pickup',
            'name': pickup_coords['name'],
            'lat': pickup_coords['lat'],
            'lng': pickup_coords['lng'],
            'time_label': pickup_time,
            'activity': 'Pickup / load',
            'duration': '1 hr',
            'day': pickup_day
        })
        
        waypoints.append({
            'type': 'dropoff',
            'name': dropoff_coords['name'],
            'lat': dropoff_coords['lat'],
            'lng': dropoff_coords['lng'],
            'time_label': dropoff_time,
            'activity': 'Dropoff / unload',
            'duration': '1 hr',
            'day': dropoff_day
        })
        
        # In a more advanced version, we would interpolate the polyline to find lat/lng
        # for fuel stops and rest stops based on distance driven.
        # For now, we return the primary route waypoints.
        
        return {
            'summary': trip_data['summary'],
            'route': {
                'polyline': polyline,
                'waypoints': waypoints
            },
            'days': trip_data['days']
        }
