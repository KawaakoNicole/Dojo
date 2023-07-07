from email.policy import default
from django.db import models

# Create your models here.
class Task(models.Model):
    name= models.CharField(max_length=200)
    completed = models.BooleanField(default=False, null=True, blank=True)
    deadline = models.DateField(null=True)
    email = models.EmailField(null=True, default="nkawaako@gmail.com")
    
    def __str__(self):
        return self.name
    
    
