from django.urls import path
from .views import TripPlanView, HealthView

urlpatterns = [
    path('plan-trip/', TripPlanView.as_view(), name='plan_trip'),
    path('health/',    HealthView.as_view(),   name='health'),
]
