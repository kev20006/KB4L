from django.db import models

from ..boards.models import Board
# Create your models here.

class RecentActivity(models.Model):
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    message = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
