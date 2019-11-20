from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer, SubscriptionSerializer
from django.contrib.auth.models import User
from .models import Subscription

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            Subscription.objects.create(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"error":"fail"})


@api_view(['GET', 'PUT'])
@authentication_classes([])
@permission_classes([])
def manage_subscription(request, username):
    """
    Route to manage subscriptions and sub status
    """
    if request.method == "GET":
        user = User.objects.get(username=username)
        sub = Subscription.objects.get(user=user)
        serializer = SubscriptionSerializer(sub)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "PUT":
        user = User.objects.get(username=username)
        sub = Subscription.objects.get(user=user)
        serializer = SubscriptionSerializer(sub, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_user_by_id(request, id):
    if User.objects.filter(id=id).exists():
        user = User.objects.get(id=id)
        serialiser = UserSerializer(user)
        print(serialiser.data)
        return Response({"username": serialiser.data["username"], "id": id})
    return Response({"error": "no user by that id"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_user_id_by_name(request, username):
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        serialiser = UserSerializer(user)
        print(serialiser.data)
        return Response({"username": serialiser.data["username"], "id": serialiser.data["id"]})
    return Response({"error": "no user by that username"}, status=status.HTTP_200_OK)
