from django.db import models

from rest_framework import serializers
from .models import Board, Member


class BoardSerializer(serializers.ModelSerializer):
    """
    functions for serialising board data - to work with DRF 
    """
    class Meta:
       model = Board
       fields = ['id', 'name', 'description', 'board_url', 'joining_code']

    def create(self, validated_data):
        """
        Create and return a new board instance, given the validated data.
        """
        return Board.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing board instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description
        )
        instance.board_url = validated_data.get(
            'board_url', instance.board_url
        )
        instance.joining_code = validated_data.get(
            'joining_code', instance.joining_code
        )
        instance.save()
        return instance


class MemberSerializer(serializers.ModelSerializer):
    """
    functions for serialiseing Member data - to work with DRF
    """
    class Meta:
       model = Member
       fields = ['user_id', 'board_id', 'is_admin', "is_creator", 'score']

    def create(self, validated_data):
        """
        Create and return a new member instance, given the validated data.
        """
        return Member.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return Member instance, given the validated data.
        """
        instance.is_admin = validated_data.get('is_admin', instance.is_admin)
        instance.score = validated_data.get('score', instance.score)
        instance.save()
        return instance
