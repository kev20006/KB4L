from django.contrib import admin
from django.urls import path, re_path, include

from .views import get_job_list_by_board, modify_job_status, get_job_list_by_user

urlpatterns = [
    path('all/<int:user_id>', get_job_list_by_user, name="user_jobs"),
    path('<int:board_id>', get_job_list_by_board, name="board_jobs"),
    path('<int:board_id>/tasks/<int:task_id>', modify_job_status, name="get_tasks"),
]
