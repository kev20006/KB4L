from django.db import models
from django.contrib.auth.models import User

from ..boards.models import Board
# Create your models here.

class Job(models.Model):
    #Priority Options
    HIGH = "5"
    MEDHIGH = "4"
    MED = "3"
    MEDLOW = "2"
    LOW = "1"
    PRIORITY_CHOICES = [
        (HIGH, "High"),
        (MEDHIGH, "Medium/High"),
        (MED, "Medium"),
        (MEDLOW, "Medium/Low"),
        (LOW, "Low"),
    ]
    #Status Options
    STATUS_OPTIONS = [
        ("1", "unassigned"),
        ("2", "inprogress"),
        ("3", "completed"),
    ]
    title = models.CharField(max_length=50)
    description=models.TextField()
    points = models.IntegerField(default=0)
    priority = models.CharField(
        max_length=1,
        choices=PRIORITY_CHOICES,
        default=MED
    )
    status = models.CharField(
        max_length=1,
        choices=STATUS_OPTIONS,
        default="1"
    )
    repeat_task = models.BooleanField(default=False)
    assigned_to = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True
    )
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
