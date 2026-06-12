import uuid
from django.db import models
from django.contrib.auth.models import User

class TripPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    created_at = models.DateTimeField(auto_now_add=True)
    origin_name = models.CharField(max_length=255)
    pickup_name = models.CharField(max_length=255)
    dropoff_name = models.CharField(max_length=255)
    total_miles = models.FloatField()
    data = models.JSONField()