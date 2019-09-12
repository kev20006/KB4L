from django.contrib import admin
from django.urls import path, include

from .views import board_by_user, board_list

urlpatterns = [
    path('', board_list),
    path('/<str:username>', board_by_user),
]
