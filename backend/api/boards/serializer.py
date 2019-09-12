from django.db import models

from rest_framework import serializers
from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
       model = Board
       fields = ['name', 'board_picture', 'description', 'color_scheme','board_url','joining_code']

    def create(self, validated_data):
        """
        Create and return a new board instance, given the validated data.
        """
        return Board.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.board_picture = validated_data.get(
            'board_picture', instance.code
        )
        instance.description = validated_data.get(
            'description', instance.description
        )
        instance.color_scheme = validated_data.get(
            'color_scheme', instance.color_scheme
        )
        instance.board_url = validated_data.get(
            'board_url', instance.board_url
        )
        instance.joining_code = validated_data.get(
            'joining_code', instance.joining_code
        )
        instance.save()
        return instance
