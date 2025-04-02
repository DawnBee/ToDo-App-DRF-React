from django.db import models
import uuid

class Priority(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    LEVELS = [
        ("Urgent", "Urgent"),
        ("High", "High"),
        ("Normal", "Normal"),
    ]
    level = models.CharField(max_length=10, choices=LEVELS, unique=True, default='Urgent')

    def __str__(self):
        return self.level


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CATEGORIES = [
        ("Work", "Work"),
        ("Personal", "Personal"),
        ("Others", "Others"),
    ]
    name = models.CharField(max_length=20, choices=CATEGORIES, unique=True, default='Personal')

    def __str__(self):
        return self.name


class Attachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment {self.id}"


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # Foreign keys
    priority = models.ForeignKey(Priority, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    attachment = models.ForeignKey(Attachment, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name