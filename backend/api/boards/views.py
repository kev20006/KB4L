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
@api_view(['GET'])
def board_list(request, format=None):
    '''
    test route to get some JSON
    '''
    if request.method == 'GET':
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)


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
            boards_json = serializers.serialize('json', boards)
            return Response({"boards": response_data})
        except: 
            return Response({"error":"user does not exist"})
