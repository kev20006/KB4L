from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

from .models import Subscription


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('user', 'max_boards', 'subscription', 'sub_expires')

    def create(self, validated_data):
        """
        Create and return a new board instance, given the validated data.
        """
        return Subscription.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.max_boards = validated_data.get(
            'max_boards', instance.max_boards
        )
        instance.subscription = validated_data.get(
            'subscription', instance.subscription
        )
        instance.sub_expires = validated_data.get(
            'sub_expires', instance.sub_expires
        )
        instance.save()
        return instance
