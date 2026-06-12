import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from .serializers import (
    TripInputSerializer,
    UserSerializer,
    RegisterSerializer,
    MyTokenObtainPairSerializer,
    TripPlanModelSerializer
)
from .models import TripPlan
from .services.geocoding import geocode_location
from .services.routing import get_route
from .services.hos_calculator import calculate_trip
from .services.log_builder import LogSheetBuilder

logger = logging.getLogger(__name__)

class HealthView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({"status": "ok", "service": "SpotterAI ELD Trip Planner"})

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TripPlanView(APIView):
    permission_classes = [IsAuthenticated]

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

            trip_plan = TripPlan.objects.create(
                driver=request.user,
                origin_name=data['current_location'],
                pickup_name=data['pickup_location'],
                dropoff_name=data['dropoff_location'],
                total_miles=final_response['summary']['total_miles'],
                data=final_response
            )

            return Response(TripPlanModelSerializer(trip_plan).data, status=status.HTTP_201_CREATED)

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

class TripPlanListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trips = TripPlan.objects.filter(driver=request.user).order_by('-created_at')
        serializer = TripPlanModelSerializer(trips, many=True)
        return Response(serializer.data)

class TripPlanDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            trip = TripPlan.objects.get(pk=pk, driver=request.user)
            trip.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TripPlan.DoesNotExist:
            return Response({"error": "Trip not found."}, status=status.HTTP_404_NOT_FOUND)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer