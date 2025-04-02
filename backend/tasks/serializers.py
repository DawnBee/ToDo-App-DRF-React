from rest_framework import serializers
from .models import Task, Priority

class TaskSerializer(serializers.ModelSerializer):
    priority = serializers.SlugRelatedField(queryset=Priority.objects.all(), slug_field='level')
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'completed', 'due_date', 'created_at', 'priority']