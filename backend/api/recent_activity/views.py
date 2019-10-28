from django.shortcuts import render
from django.db import models

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import RecentActivity
from ..boards.models import Board, Member
from ..tasks.models import Job
from .serializer import Recent_Activity_Serializer

# Create your views here.

def add_task_to_board(username, board_id, task_name):
    '''
    add activity to the model - function to be called on all changes throughout the app
    '''
    board = Board.objects.get(id=board_id)
    message = "{}: {} has added a new task, {} ".format(
        board.name, username, task_name
    )
    RecentActivity.objects.create(board_id=board, message=message)


def task_changed_status(username, board_id, task_id):
    board = Board.objects.get(id=board_id)
    task = Job.objects.get(id=task_id)
    message  = "{}: {} has moved {} to {}".format(
        board.name, username, task.name, task.status
    )
    RecentActivity.objects.create(board_id=board, message=message)

def task_assigned_to_user(username, board_id, task_name):
    board = Board.objects.get(id=board_id)
    message = "{}: {} has been assigned to {}".format(
        board.name, task_name, username
    )
    RecentActivity.objects.create(board_id=board, message=message)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_activity_by_user(request, username):
    recent_activity_array = []
    for i in Member.objects.filter(user_id=username):
        for j in RecentActivity.objects.filter(board_id=i.board_id):

            recent_activity_array.append(Recent_Activity_Serializer(j).data)
    if len(recent_activity_array) == 0:
        return Response({"results":"no recent news"})
    return Response({"results": recent_activity_array})
    
