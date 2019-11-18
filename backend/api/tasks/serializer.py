from django.db import models

from rest_framework import serializers
from .models import Job
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
       model = Job
       fields = ['id', 'title', 'description', 'points', 'priority',
                 'status', 'repeat_task', 'assigned_to', 'board'] 

    def create(self, validated_data):
        """
        Create and return a new task, given the validated data.
        """
        return Job.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing task instance, given the validated data.
        """
    
        instance.title = validated_data.get(
            'title', instance.title
        )
        instance.description = validated_data.get(
            'description', instance.description
        )
        instance.points = validated_data.get(
            'points', instance.points
        )
        instance.priority = validated_data.get(
            'priority', instance.priority
        )
        instance.status = validated_data.get(
            'status', instance.status
        )
        instance.repeat_task = validated_data.get(
            'repeat_task', instance.repeat_task
        )
        instance.board = validated_data.get(
            'board', instance.board
        )
        instance.save()
        return instance
