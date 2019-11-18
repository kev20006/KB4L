from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Subscription(models.Model):
    """
    Model to track user subscriptions
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    max_boards = models.IntegerField(default=2)
    subscription = models.BooleanField(default=False)
    sub_expires = models.DateField(auto_now=True)
