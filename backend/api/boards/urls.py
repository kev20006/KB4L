from django.contrib import admin
from django.urls import path, include

from .views import board_by_user, board_list, is_member

urlpatterns = [
    path('', board_list),
    path('member', is_member),
    path('<str:username>', board_by_user),
    
    ]
