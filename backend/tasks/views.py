from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Task, Priority, Category, Attachment
from .serializers import TaskSerializer, PrioritySerializer, CategorySerializer, AttachmentSerializer
from rest_framework.decorators import action

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        task_data = request.data
        priority_data = task_data.get('priority')
        category_data = task_data.get('category')
        attachment_data = task_data.get('attachment')

        # Priority
        if priority_data:
            priority_serializer = PrioritySerializer(data=priority_data)
            if priority_serializer.is_valid():
                priority_instance = priority_serializer.save()
            else:
                return Response(priority_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            priority_instance = None  

        if category_data:
            category_serializer = CategorySerializer(data=category_data)
            if category_serializer.is_valid():
                category_instance = category_serializer.save()
            else:
                return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            category_instance = None  

        if attachment_data:
            attachment_serializer = AttachmentSerializer(data=attachment_data)
            if attachment_serializer.is_valid():
                attachment_instance = attachment_serializer.save()
            else:
                return Response(attachment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            attachment_instance = None

        # Links task object with priority, category, attachment
        task_data['priority'] = priority_instance
        task_data['category'] = category_instance
        task_data['attachment'] = attachment_instance

        task_serializer = self.get_serializer(data=task_data)
        if task_serializer.is_valid():
            task_instance = task_serializer.save()
            return Response(task_serializer.data, status=status.HTTP_201_CREATED)
        return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        task_instance = self.get_object()
        task_data = request.data
        priority_data = task_data.get('priority')
        category_data = task_data.get('category')
        attachment_data = task_data.get('attachment')

        # Priority
        if priority_data:
            priority_serializer = PrioritySerializer(task_instance.priority, data=priority_data, partial=True)
            if priority_serializer.is_valid():
                priority_instance = priority_serializer.save()
            else:
                return Response(priority_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            priority_instance = task_instance.priority

        # Category
        if category_data:
            category_serializer = CategorySerializer(task_instance.category, data=category_data, partial=True)
            if category_serializer.is_valid():
                category_instance = category_serializer.save()
            else:
                return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            category_instance = task_instance.category

        # Attachment
        if attachment_data:
            attachment_serializer = AttachmentSerializer(task_instance.attachment, data=attachment_data, partial=True)
            if attachment_serializer.is_valid():
                attachment_instance = attachment_serializer.save()
            else:
                return Response(attachment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            attachment_instance = task_instance.attachment

        # Updates task object with priority, category, attachment
        task_data['priority'] = priority_instance
        task_data['category'] = category_instance
        task_data['attachment'] = attachment_instance

        task_serializer = self.get_serializer(task_instance, data=task_data, partial=True)
        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data)
        return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)