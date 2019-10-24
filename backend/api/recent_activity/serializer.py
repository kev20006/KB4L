from django.db import models

from rest_framework import serializers
from .models import Recent_Activity

class Recent_Activity_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Recent_Activity
        fields = ['board_id', 'message']
