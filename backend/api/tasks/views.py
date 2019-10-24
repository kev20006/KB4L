import jwt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .models import Job
from .serializer import TaskSerializer

from ..recent_activity.views import add_task_to_board

# Create your views here.
@api_view(['GET', 'POST'])
def get_job_list_by_board(request, board_id, format=None):
    if request.method == 'GET':
        jobs = Job.objects.filter(board=board_id)
        serializer = TaskSerializer(jobs, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # record the action in recent activity
            token_info = jwt.decode(request.META["HTTP_AUTHORIZATION"].split(sep=" ")[1], None, None)
            print(request.data)
            add_task_to_board(
                token_info["username"], request.data["board"], request.data["title"]
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
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
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
