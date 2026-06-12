from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import TripPlan

class TripInputSerializer(serializers.Serializer):
    current_location  = serializers.CharField(max_length=255, required=True)
    pickup_location   = serializers.CharField(max_length=255, required=True)
    stops             = serializers.ListField(
        child=serializers.CharField(max_length=255),
        required=False,
        default=[]
    )
    dropoff_location  = serializers.CharField(max_length=255, required=True)
    cycle_hours_used  = serializers.FloatField(
        min_value=0.0,
        max_value=70.0,
        required=False,
        default=0.0
    )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'username': self.user.username,
            'email': self.user.email,
            'id': self.user.id
        }
        return data

class TripPlanModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripPlan
        fields = '__all__'
        read_only_fields = ('driver', 'created_at')