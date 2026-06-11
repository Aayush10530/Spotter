from django.urls import path
from .views import TripPlanView, HealthView, FleetView, ChatView

urlpatterns = [
    path('plan-trip/', TripPlanView.as_view(), name='plan_trip'),
    path('health/', HealthView.as_view(), name='health'),
    path('fleet/', FleetView.as_view(), name='fleet'),
    path('chat/', ChatView.as_view(), name='chat'),
]
