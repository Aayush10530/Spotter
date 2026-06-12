from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    TripPlanView,
    HealthView,
    RegisterView,
    TripPlanListView,
    TripPlanDetailView,
    MyTokenObtainPairView
)

urlpatterns = [
    path('plan-trip/', TripPlanView.as_view(), name='plan_trip'),
    path('health/', HealthView.as_view(), name='health'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('trips/', TripPlanListView.as_view(), name='trips_list'),
    path('trips/<uuid:pk>/', TripPlanDetailView.as_view(), name='trip_detail'),
]