from django.db import models

from rest_framework import serializers
from .models import RecentActivity

class Recent_Activity_Serializer(serializers.ModelSerializer):
    """
    functions for serialiseing Member data - to work with DRF
    """
    class Meta:
        model = RecentActivity
        fields = ['board_id', 'message', 'time']
