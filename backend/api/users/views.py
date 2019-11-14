from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.shortcuts import render
from django.db import models
from django.core import serializers
from django.contrib.auth.models import User


from .serializers import UserSerializer


@api_view(['POST'])
@authentication_classes([])
@permission_classes([ ])
def createUser(request, format = None):
    print(request.data)
    serializer=UserSerializer(data = request.data)
    if serializer.is_valid():
        user=serializer.save()
        if user:
            return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response({"error":"fail"})
