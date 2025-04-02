from django.test import TestCase
from django.utils import timezone
from .models import Task, Priority, Category, Attachment
import uuid

class TaskModelTest(TestCase):

    def setUp(self):
        # Set up any related data first (e.g., Priority, Category, Attachment)
        self.priority = Priority.objects.create(level="High")
        self.category = Category.objects.create(name="Work")
        self.attachment = Attachment.objects.create(image=None)

        # Create a task
        self.task = Task.objects.create(
            name="Test Task",
            description="This is a test task.",
            completed=False,
            due_date=timezone.now(),
            priority=self.priority,
            category=self.category,
            attachment=self.attachment
        )

    def test_task_creation(self):
        """Test task creation"""
        self.assertEqual(self.task.name, "Test Task")
        self.assertEqual(self.task.description, "This is a test task.")
        self.assertEqual(self.task.completed, False)
        self.assertIsNotNone(self.task.due_date)
        self.assertEqual(self.task.priority, self.priority)
        self.assertEqual(self.task.category, self.category)
        self.assertEqual(self.task.attachment, self.attachment)

    def test_task_due_date_is_nullable(self):
        """Test that due_date can be null"""
        task_without_due_date = Task.objects.create(
            name="Task without due date",
            description="This task has no due date.",
            completed=False,
            priority=self.priority,
            category=self.category,
            attachment=self.attachment
        )
        self.assertIsNone(task_without_due_date.due_date)

    def test_task_completed_field(self):
        """Test that the completed field is a boolean"""
        self.task.completed = True
        self.task.save()
        self.assertTrue(self.task.completed)

    def test_task_priority_fk(self):
        """Test the foreign key relationship with Priority"""
        self.assertEqual(self.task.priority.level, "High")
        self.assertEqual(self.task.priority, self.priority)

    def test_task_category_fk(self):
        """Test the foreign key relationship with Category"""
        self.assertEqual(self.task.category.name, "Work")
        self.assertEqual(self.task.category, self.category)

    def test_task_attachment_fk(self):
        """Test the foreign key relationship with Attachment"""
        self.assertEqual(self.task.attachment, self.attachment)

    def test_task_unique_name(self):
        """Test that the 'name' field is unique"""
        with self.assertRaises(Exception):
            Task.objects.create(
                name="Test Task",
                description="Another test task.",
                completed=False,
                due_date=timezone.now(),
                priority=self.priority,
                category=self.category,
                attachment=self.attachment
            )

    def test_task_auto_created_at(self):
        """Test that created_at is automatically set"""
        self.assertIsNotNone(self.task.created_at)

    def test_task_due_date_type(self):
        """Test that the due_date is a DateTime"""
        self.assertIsInstance(self.task.due_date, timezone.datetime)