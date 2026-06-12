import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TripInputSerializer
from .services.geocoding import geocode_location
from .services.routing import get_route
from .services.hos_calculator import calculate_trip
from .services.log_builder import LogSheetBuilder

logger = logging.getLogger(__name__)

class HealthView(APIView):
    def get(self, request):
        return Response({"status": "ok", "service": "SpotterAI ELD Trip Planner"})

class TripPlanView(APIView):
    def post(self, request):
        serializer = TripInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        data = serializer.validated_data

        try:
            origin_coords  = geocode_location(data['current_location'])
            pickup_coords  = geocode_location(data['pickup_location'])
            
            stops_coords = []
            for stop in data.get('stops', []):
                if stop.strip():
                    stops_coords.append(geocode_location(stop))
                    
            dropoff_coords = geocode_location(data['dropoff_location'])

            all_stops = [origin_coords, pickup_coords] + stops_coords + [dropoff_coords]
            
            legs = []
            for i in range(len(all_stops) - 1):
                legs.append(get_route(all_stops[i], all_stops[i+1]))

            trip_data = calculate_trip(
                all_stops,
                legs,
                data.get('cycle_hours_used', 0.0)
            )

            final_response = LogSheetBuilder.build(
                all_stops,
                legs,
                trip_data
            )

            return Response(final_response, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.exception("Unexpected error processing trip")
            return Response(
                {"error": "An internal error occurred. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )