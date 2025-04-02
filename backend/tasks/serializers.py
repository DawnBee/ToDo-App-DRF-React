from rest_framework import serializers
from .models import Task, Priority, Category, Attachment

class TaskSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(queryset=Category.objects.all(), slug_field='name')
    priority = serializers.SlugRelatedField(queryset=Priority.objects.all(), slug_field='level')
    attachment_image = serializers.ImageField(source='attachment.image', required=False)

    def create(self, validated_data):
        attachment_data = validated_data.pop('attachment', None)
        task = Task.objects.create(**validated_data)
        
        if attachment_data and 'image' in attachment_data:
            attachment = Attachment.objects.create(image=attachment_data['image'])
            task.attachment = attachment
        
        return task
    
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'completed', 'due_date', 'created_at', 'priority','category','attachment_image']