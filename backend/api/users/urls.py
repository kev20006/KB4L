from django.contrib import admin
from django.urls import path, include

from .views import create_user, manage_subscription, get_user_by_id

urlpatterns = [
    path('member', create_user),
    path('member/subscription/<str:username>', manage_subscription),
    path('<int:id>', get_user_by_id),
]
