from django.db import models

from rest_framework import serializers
from .models import RecentActivity

class Recent_Activity_Serializer(serializers.ModelSerializer):
    class Meta:
        model = RecentActivity
        fields = ['board_id', 'message']
