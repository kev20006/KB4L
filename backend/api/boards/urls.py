from django.contrib import admin
from django.urls import path, include

from .views import board_by_user, board_list, is_member, board_by_url

urlpatterns = [
    path('', board_list),
    path('member', is_member),
    path('username/<str:username>', board_by_user),
    path('url/<str:url>', board_by_url)
]