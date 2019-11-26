"""
Tests for the tasks app
"""

from django.test import TestCase

from ..boards.models import Board
from .models import Job

# Create your tests here.


class ModelTestCase(TestCase):
    """This class defines the test suite for the job model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.title = "This is a title"
        self.description = "I am a task"
        self.points = 5
        self.priority = "1"
        self.status = "1"
        self.repeat_task = False
        self.assigned_to = None
        self.board = Board(name="Board 1", description="a board")
        self.board.save()
        self.job = Job(
            title=self.title,
            description=self.description,
            points=self.points,
            priority=self.priority,
            status=self.status,
            repeat_task=self.repeat_task,
            assigned_to=self.assigned_to,
            board=self.board
        )

    def test_model_can_create_a_bucketlist(self):
        """Test the bucketlist model can create a bucketlist."""
        old_count = Job.objects.count()
        self.job.save()
        new_count = Job.objects.count()
        self.assertNotEqual(old_count, new_count)
