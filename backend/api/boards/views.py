from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from django.db import models
from django.core import serializers
from django.contrib.auth.models import User

from .models import Board, Members
from .serializer import BoardSerializer 

# Create your views here.
@api_view(['GET','POST'])
def board_list(request, format=None):
    '''
    test route to get some JSON
    '''
    if request.method == 'GET':
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
def board_by_user(request, username):
    if request.method == 'GET':
        try:
            response_data = []
            user = User.objects.get(username=username)
            print(user.id)
            boards = Members.objects.filter(user_id=user.id).select_related('board_id')
            for board in boards:
               response_data.append(BoardSerializer(board.board_id).data)
            return Response({"boards": response_data})
        except: 
            return Response({"error":"user does not exist"})


@api_view(['GET'])
def is_member(request):
    if request.method == "GET":
        user_id = request.GET.get('user_id', None)
        board_id = request.GET.get('board_id', None)
        try: 
            isMember = Members.objects.get(board_id=board_id, user_id=user_id)
            return Response({"is_member": True})
        except:
            return Response({"is_member": False})
