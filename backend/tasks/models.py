from django.db import models
import uuid

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
    
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # Foreign keys
    priority = models.ForeignKey(Priority, on_delete=models.PROTECT)

    def __str__(self):
        return self.name