class LogSheetBuilder:
    @staticmethod
    def build(*args, **kwargs) -> dict:
        if len(args) > 0 and isinstance(args[0], list):
            stops_coords = args[0]
            legs = args[1]
            trip_data = args[2]
        else:
            origin_coords = args[0] if len(args) > 0 else kwargs['origin_coords']
            pickup_coords = args[1] if len(args) > 1 else kwargs['pickup_coords']
            dropoff_coords = args[2] if len(args) > 2 else kwargs['dropoff_coords']
            deadhead_route = args[3] if len(args) > 3 else kwargs['deadhead_route']
            loaded_route = args[4] if len(args) > 4 else kwargs['loaded_route']
            trip_data = args[5] if len(args) > 5 else kwargs['trip_data']
            
            stops_coords = [origin_coords, pickup_coords, dropoff_coords]
            legs = [deadhead_route, loaded_route]

        origin_coords = stops_coords[0]
        pickup_coords = stops_coords[1]
        dropoff_coords = stops_coords[-1]

        polyline = []
        for leg in legs:
            polyline.extend(leg['polyline'])

        waypoints = []

        def find_remark(activity_name):
            for day in trip_data['days']:
                for remark in day['remarks']:
                    if remark['activity'] == activity_name:
                        return remark['time_label'], day['day_number']
            return "6:00 AM", 1

        def interpolate_coords(polyline, fraction):
            if not polyline or len(polyline) < 2:
                return polyline[0] if polyline else [0, 0]
            idx = int(fraction * (len(polyline) - 1))
            idx = max(0, min(idx, len(polyline) - 1))
            return polyline[idx]

        start_time, start_day = find_remark("Pre-trip inspection")
        waypoints.append({
            'type': 'start',
            'name': origin_coords['name'],
            'lat': origin_coords['lat'],
            'lng': origin_coords['lng'],
            'time_label': start_time,
            'activity': 'Pre-trip inspection',
            'duration': '1 hr',
            'day': start_day
        })

        total_miles = trip_data['summary']['total_miles'] or 1
        miles_accumulated = 0.0

        for day in trip_data['days']:
            for remark in day['remarks']:
                activity = remark['activity']

                if activity == 'Fueling stop':
                    fraction = min(miles_accumulated / total_miles, 1.0)
                    coords = interpolate_coords(polyline, fraction)
                    waypoints.append({
                        'type': 'fuel',
                        'name': remark['location'],
                        'lat': coords[0],
                        'lng': coords[1],
                        'time_label': remark['time_label'],
                        'activity': 'Fueling stop',
                        'duration': '30 min',
                        'day': day['day_number']
                    })

                elif activity == '10-hr sleeper berth rest':
                    fraction = min(miles_accumulated / total_miles, 1.0)
                    coords = interpolate_coords(polyline, fraction)
                    waypoints.append({
                        'type': 'rest',
                        'name': remark['location'],
                        'lat': coords[0],
                        'lng': coords[1],
                        'time_label': remark['time_label'],
                        'activity': '10-hr rest',
                        'duration': '10 hrs',
                        'day': day['day_number']
                    })

                elif activity == 'Mandatory 30-min break':
                    fraction = min(miles_accumulated / total_miles, 1.0)
                    coords = interpolate_coords(polyline, fraction)
                    waypoints.append({
                        'type': 'break',
                        'name': remark['location'],
                        'lat': coords[0],
                        'lng': coords[1],
                        'time_label': remark['time_label'],
                        'activity': '30-min break',
                        'duration': '30 min',
                        'day': day['day_number']
                    })

            miles_accumulated += day['total_miles']

        pickup_time, pickup_day = find_remark("Pickup / load")
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

        for idx in range(2, len(stops_coords) - 1):
            activity_name = f"Stop {idx-1} / load"
            stop_time, stop_day = find_remark(activity_name)
            waypoints.append({
                'type': 'pickup',
                'name': stops_coords[idx]['name'],
                'lat': stops_coords[idx]['lat'],
                'lng': stops_coords[idx]['lng'],
                'time_label': stop_time,
                'activity': activity_name,
                'duration': '1 hr',
                'day': stop_day
            })

        dropoff_time, dropoff_day = find_remark("Dropoff / unload")
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

        waypoints.sort(key=lambda w: (w['day'], w['time_label']))

        return {
            'summary': trip_data['summary'],
            'route': {
                'polyline': polyline,
                'waypoints': waypoints
            },
            'days': trip_data['days']
        }