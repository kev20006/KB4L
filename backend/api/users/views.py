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
#@permission_classes([IsAuthenticated])
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
