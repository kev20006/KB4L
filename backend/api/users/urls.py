from django.contrib import admin
from django.urls import path, include

from .views import create_user, manage_subscription

urlpatterns = [
    path('member', create_user),
    path('member/subscription/<str:username>', manage_subscription)
]
