from rest_framework import serializers
from .models import Board


class BoardSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=100
    )
    board_picture = serializers.CharField(
        required=False,
        allow_blank=True
    )
    description = serializers.CharField()
    color_scheme = serializers.CharField()
    board_url = serializers.CharField()
    joining_code = serializers.CharField()

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
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
