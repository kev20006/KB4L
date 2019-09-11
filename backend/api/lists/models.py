from django.db import models
from django.contrib.auth.models import User

from ..boards.models import Board

# Create your models here.

class List(models.Model):
    total_value = models.DecimalField(decimal_places=2, max_digits= 5)
    paid_so_far = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)

class ListItem(models.Model):
    name = models.CharField(max_length=25)
    description = models.TextField()
    thumbnail = models.CharField(max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    status = models.CharField(
        max_length=100,
        default="in list"
    )
    list_id = models.ForeignKey(List, on_delete=models.CASCADE)
    bought_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
