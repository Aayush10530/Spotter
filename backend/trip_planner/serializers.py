from rest_framework import serializers

class TripInputSerializer(serializers.Serializer):
    current_location  = serializers.CharField(max_length=255, required=True)
    pickup_location   = serializers.CharField(max_length=255, required=True)
    dropoff_location  = serializers.CharField(max_length=255, required=True)
    cycle_hours_used  = serializers.FloatField(
        min_value=0.0,
        max_value=70.0,
        required=False,
        default=0.0
    )