from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render
from django.db import models
from django.core import serializers
from django.contrib.auth.models import User

from .models import Board, Member
from .serializer import BoardSerializer, MemberSerializer

# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
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
    


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def board_by_user(request, username):
    user = User.objects.get(username=username)
    print(user.id)
    print(request.headers["Authorization"])
    if request.method == 'GET':
        try:
            response_data = []
            boards = Member.objects.filter(user_id=user.id).select_related('board_id')
            for board in boards:
               response_data.append(BoardSerializer(board.board_id).data)
            return Response({"boards": response_data})
        except: 
            return Response({"error":"user does not exist"})
    if request.method == 'POST':
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            member_serializer = MemberSerializer(data= {
                "user_id": user.id,
                "board_id": serializer.data["id"],
                "is_admin": True
            })
            if member_serializer.is_valid():
                member_serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(member_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE '])
@permission_classes([IsAuthenticated])
def board_by_url(request, url):
    url = '/{0}/'.format(url)
    if request.method == 'GET':
        try:
            board = Board.objects.get(board_url=url)
            return Response(BoardSerializer(board).data)
        except:
            return Response({
                "id": -1,
                "error": "invalid url"
                })
    if request.method == 'DELETE':
        try:
            Board.objects.get(board_url=url).delete()
            return Response({
                "success": True
            })
        except:
            return Response({
                "success": False
            })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_member(request):
    if request.method == "GET":
        user_id = request.GET.get('user_id', None)
        board_id = request.GET.get('board_id', None)
        try: 
            isMember = Member.objects.get(board_id=board_id, user_id=user_id)
            return Response({"is_member": True})
        except:
            return Response({"is_member": False})
