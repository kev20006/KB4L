from django.contrib import admin
from django.urls import path, include

from .views import get_activity_by_user

urlpatterns = [
    path('user/<str:username>', get_activity_by_user),
]
