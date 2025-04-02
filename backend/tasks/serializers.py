from rest_framework import serializers
from .models import Task, Priority, Category, Attachment
class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ['id', 'level']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'image', 'uploaded_at']

class TaskSerializer(serializers.ModelSerializer):
    priority = PrioritySerializer()
    category = CategorySerializer()
    attachment = AttachmentSerializer()

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'completed', 'due_date', 'created_at', 'priority', 'category', 'attachment']
