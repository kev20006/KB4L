from django.db import models

from rest_framework import serializers
from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
       model = List
       fields = ['id', 'total_value', 'paid_so_far', 'board_id']

    def create(self, validated_data):
        """
        Create and return a new board instance, given the validated data.
        """
        return List.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.total_value = validated_data.get(
            'total_value', instance.total_value)
        instance.paid_so_far = validated_data.get(
            'paid_so_far', instance.paid_so_far
        )
        instance.board_id = validated_data.get(
            'board_id', instance.board_id
        )
        instance.save()
        return instance


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
       model = ListItem
       fields = ['id', 'name', 'price', 'status', 'list_id', 'bought_by']

    def create(self, validated_data):
        """
        Create and return a new ListItem instance, given the validated data.
        """
        return ListItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing List Item instance, given the validated data.
        """
        instance.name = validated_data.get(
            'name', instance.name)
        instance.paid_so_far = validated_data.get(
            'price', instance.price
        )
        instance.status = validated_data.get(
            'status', instance.status
        )
        instance.list_id = validated_data.get(
            'list_id', instance.list_id
        )
        instance.status = validated_data.get(
            'bought_by', instance.bought_by
        )

        instance.save()
        return instance
