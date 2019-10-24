from django.shortcuts import render
from django.db import models
from .models import RecentActivity

from ..boards.models import Board


# Create your views here.

def add_task_to_board(username, board_id, task_name):
    '''
    add activity to the model - function to be called on all changes throughout the app
    '''
    board = Board.objects.get(id=board_id)
    message = "{} has added a new task: {} to {}".format(
        username, task_name, board.name
    )
    print(message)
    RecentActivity.objects.create(board_id=board, message=message)
