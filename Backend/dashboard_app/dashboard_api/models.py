from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.contrib.auth.models import AbstractUser, Permission, Group
from django.db import models

class UserFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    file = models.FileField(upload_to='uploads/')  
    uploaded_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.file.name} uploaded by {self.user} on {self.uploaded_at}"







