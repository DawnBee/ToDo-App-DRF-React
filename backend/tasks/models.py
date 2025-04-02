from django_resized import ResizedImageField
from django.db import models
import uuid

class Attachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = ResizedImageField(size=[400,400], quality=85, upload_to='attachments/', null=True, blank=True)

    def __str__(self):
        return f"Attachment for task {self.task.name}"

class Category(models.Model):
    CATEGORY = [
        ("Personal", "Personal"),
        ("Work", "Work"),
        ("Others", "Others"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20, unique=True, choices=CATEGORY, default="Personal")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = 'Categories'
    
class Priority(models.Model):
    LEVELS = [
        ("Urgent", "Urgent"),
        ("High", "High"),
        ("Normal", "Normal"),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    level = models.CharField(max_length=10, unique=True, choices=LEVELS, default="Urgent")

    def __str__(self):
        return self.level

    class Meta:
        verbose_name = "Priority"
        verbose_name_plural = 'Priorities'
    
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # Foreign keys
    priority = models.ForeignKey(Priority, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    attachment = models.ForeignKey(Attachment, on_delete=models.CASCADE, related_name='task', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = 'Tasks'