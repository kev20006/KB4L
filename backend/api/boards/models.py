from django.utils.crypto import get_random_string
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Board(models.Model):
    """
    Model to represent a kanban board
    """
    new_code = get_random_string(length=8)
    name = models.CharField(max_length=100)
    description = models.TextField()
    board_url = models.CharField(max_length=25, default="/"+ new_code +"/", unique=True)
    joining_code = models.CharField(max_length=10, default=new_code, unique=True)

class Member(models.Model):
    """
    Model to represent a Member Relationship to a kanban board
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    is_creator = models.BooleanField()
    is_admin = models.BooleanField()
    score = models.IntegerField(default=0)
