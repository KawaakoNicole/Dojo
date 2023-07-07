from http.client import HTTPResponse
from django.shortcuts import render, HttpResponse
from authentication.models import User

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task

from .serializers import TaskSerializer
from django.views import View

# For authentication
from django.utils.encoding import force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
# from .utils import token_generator

# for sendgrid
from django.core.mail import send_mail

from .serializers import UserSerializer
from rest_framework import status

from rest_framework.generics import GenericAPIView

# For all tasks in the database
@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

# For tasks belonging to an individual person

@api_view(['GET'])
def ownerTasks(request, owner):
    tasks = Task.objects.filter(owner=owner)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



# To ge details of a specific task
@api_view(['GET'])
def taskDetails(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)

# For deleting a task
@api_view(['DELETE'])
def taskDelete(request, id):
    task = Task.objects.get(id=id)
    task.delete()
    return Response('Deleted successfully....')


# For creating a task and adding it to the tasks already in the datavbase
@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# For updating the details of an individual task
@api_view(['POST'])
def taskUpdate(request, id):
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# For activating the user account
API_KEY = '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'


import datetime

@api_view(['GET'])
def homes(request):
    tasks = Task.objects.all()

    for task in tasks:
        print(task.email)
       
        user = User.objects.get(email=task.email)      
     
        if task.completed == False and datetime.date.today() + datetime.timedelta(days=1) == task.deadline:
            message = Mail(
                from_email='benjaminjjumba@gmail.com',
                to_emails=task.email,
                subject='Task expiration - Deadline approaching',
                html_content="Hello there <span style='color: blue;'>"+user.username + "</span>, <br>Your task with task name "+task.name+" is expiring tomorrow. <br> We emailed you to give you a headsup so that it doesnt expire without your knowledge.<br><p>Redards, <br> Nicole todo app </p>"
            )

            sg = SendGridAPIClient('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')
            sg.send(message)

    return HttpResponse("success")





