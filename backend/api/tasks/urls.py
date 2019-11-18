from django.contrib import admin
from django.urls import path, include

from .views import get_job_list_by_board, modify_job_status, get_job_list_by_user

urlpatterns = [
    path('all/<int:user_id>', get_job_list_by_user),
    path('<int:board_id>', get_job_list_by_board),
    path('<int:board_id>/tasks/<int:task_id>', modify_job_status),
]
