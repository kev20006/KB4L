'''
Routes to manage boards and board membership
'''
from django.utils.crypto import get_random_string
import random
import string

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail

from .models import Board, Member
from .serializer import BoardSerializer, MemberSerializer
from ..recent_activity.views import add_user_to_board
from ..users.models import Subscription

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def board_by_user(request, username):
    """
    Given a username, retrieve corresponding boards
    """
    user = User.objects.get(username=username)
    current_usage = Member.objects.filter(user_id=user, is_creator=True).count()
    subs = Subscription.objects.get(user=user)
    if request.method == 'GET':
        try:
            response_data = []
            boards = Member.objects.filter(user_id=user.id).select_related('board_id')
            for board in boards:
                serialised_board = BoardSerializer(board.board_id).data
                serialised_board["score"] = board.score
                print(serialised_board)
                response_data.append(serialised_board)
            return Response({"boards": response_data})
        except ObjectDoesNotExist:
            return Response({"error":"user does not exist"})
    """
    Given a username, create a new board and add that user as a member
    """
    if request.method == 'POST':
        new_board = request.data
        new_board["joining_code"] = get_random_string(length=8)
        serializer = BoardSerializer(data=new_board)
        if serializer.is_valid():
            if current_usage < subs.max_boards or subs.subscription:
                serializer.save()
                member_serializer = MemberSerializer(data={
                    "user_id": user.id,
                    "board_id": serializer.data["id"],
                    "is_admin": True,
                    "is_creator":True
                })
                if member_serializer.is_valid():
                    member_serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": member_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "no usage left"})
        print("invalid")
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE '])
@permission_classes([IsAuthenticated])
def board_by_url(request, url):
    """
    Given a the url of a board - retrive that board, or delete the corresponding board
    """
    url = '/{0}/'.format(url)
    if request.method == 'GET':
        if Board.objects.filter(board_url=url).exists():
            board = Board.objects.get(board_url=url)
            return Response(BoardSerializer(board).data)
        else:
            return Response({
                "id": -1,
                "error": "invalid url"
                })
    if request.method == 'DELETE':
        if Board.objects.filter(board_url=url).exists():
            Board.objects.get(board_url=url).delete()
            return Response({
                "success": True
            })
        return Response({
            "success": False
        })

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def board_by_id(request, id):
    """
    Given a the boards PK - retrive that board, or delete that board
    """
    if request.method == 'GET':
        try:
            board = Board.objects.get(id=id)
            return Response(BoardSerializer(board).data)
        except ObjectDoesNotExist:
            return Response({
                "id": -1,
                "error": "invalid id"
            })
    if request.method == 'DELETE':
        try:
            Board.objects.get(id=id).delete()
            return Response({
                "success": True
            })
        except ObjectDoesNotExist:
            return Response({
                "success": False
            })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usage_count(request, user_id):
    """
    Route to count the number of boards user is an admin of
    """
    board_count = Member.objects.filter(user_id=user_id, is_creator=True).count()
    return Response({"board_count": board_count})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_member(request):
    """
    Route to confirm if user is a member of a board
    """
    if request.method == "GET":
        user_id = request.GET.get('user_id', None)
        board_id = request.GET.get('board_id', None)
        if Member.objects.get(board_id=board_id, user_id=user_id).exists():
            return Response({"is_member": True})
        else:
            return Response({"is_member": False})


@api_view(['GET'])
@permission_classes([])
def member_by_board(request, board_id):
    """
    Route to get all the members of a board, along with there board scores
    """
    if request.method == "GET":
        try:
            members = Member.objects.filter(board_id=board_id)
            member_names = []
            member_scores = []
            admins = []
            for i in members:
                member_names.append(i.user_id.username)
                member_scores.append(i.score)
                if i.is_admin:
                    admins.append(i.user_id.username)
            return Response({
                "memberNames": member_names,
                "memberScores": member_scores,
                "admins": admins 
                })
        except ObjectDoesNotExist:
            return Response({"error": "resource not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_member_list_board(request):
    """
    route to take a list of email addresses add them to the board
    If the user is already a member of KB4l the are added to the board
    If they are not the are sent an email that deeplinks into he register form
    """
    print(request.data)
    board = Board.objects.get(joining_code=request.data["boardCode"])
    print(board.name)
    for i in request.data["emails"]:
        if User.objects.filter(email=i["value"]).exists():
            user = User.objects.get(email=i["value"])
            if Member.objects.filter(user_id=user.id, board_id=board.id).exists():
                print("{} exists in database and is a member".format(user.username))
            else:
                Member.objects.create(user_id=user, board_id=board, is_admin=False, is_creator=False)
                add_user_to_board(user.username, board.id)
                print("{} exists in database but is not a member".format(user.username))
        else:
            print ("user does not exist in database")
            send_mail(
                'You have been invited to join KB4L',
                'You have been invtied to the KB4l Board for {} \n'.format(board.name) +
                'click this link below join \n' +
                'http://localhost:4200/register?email={}&board_code={}'.format(
                    i["value"],
                    request.data["boardCode"]
                ),
                'no_reply@KB4L.com',
                [i["value"]],
                fail_silently=False,
            )
    return Response({"success":"members have been added"})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def add_user_by_board_code(request):
    """
    Route to allow users to join using a board code
    """
    if request.method == 'POST':
        if Board.objects.filter(joining_code=request.data["board_code"]).exists():
            user = User.objects.get(id=request.data["user_id"])
            board = Board.objects.get(joining_code=request.data["board_code"])
            if not Member.objects.filter(board_id=board, user_id=user).exists():
                Member.objects.create(
                    user_id=user, board_id=board, is_admin=False, is_creator=False)
                add_user_to_board(user.username, board.id)
                return Response({"success": "user added"})
            else:
                return Response({"error": "user already member of board or user does not exist"})
        return Response({"error": "invalid board code"})
