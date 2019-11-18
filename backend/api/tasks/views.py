import jwt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render

from django.contrib.auth.models import User
from .models import Job
from ..boards.models import Board
from .serializer import TaskSerializer

from ..recent_activity.views import add_task_to_board

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_job_list_by_board(request, board_id, format=None):
    if request.method == 'GET':
        jobs = Job.objects.filter(board=board_id)
        serializer = TaskSerializer(jobs, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        username = request.data["assigned_to"]
        request.data["assigned_to"] = None
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer)
            if username:
                user = User.objects.get(username=username)
                job = Job.objects.get(title=serializer.data["title"], board=serializer.data["board"])
                job.assigned_to = user
                job.save()
                print(job.id)
                print(job.assigned_to)
            # record the action in recent activity
            token_info = jwt.decode(request.META["HTTP_AUTHORIZATION"].split(sep=" ")[1], None, None)
            add_task_to_board(
                token_info["username"], request.data["board"], request.data["title"]
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_job_list_by_user(request, user_id):
    """
    Get a list of jobs assigned to a user
    """
    if request.method == 'GET':
        jobs = Job.objects.filter(assigned_to=user_id)
        serializer = TaskSerializer(jobs, many=True)
        response_data = serializer.data
        #modify default response to include board url and board name
        for i in range(len(response_data)):
            board_details = Board.objects.get(id=response_data[i]["board"])
            response_data[i]["board_name"] = board_details.name
            response_data[i]["board_url"] = board_details.board_url
        return Response(response_data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def modify_job_status(request, board_id, task_id):
    try:
        job = Job.objects.get(id=task_id)
    except job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(job)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("invalid!!")
            print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
