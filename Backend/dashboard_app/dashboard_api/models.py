from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.contrib.auth.models import AbstractUser, Permission, Group
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Ensure email is unique
    USERNAME_FIELD = 'email'  # Set email as the username field
    REQUIRED_FIELDS = []  # No additional required fields

    # Override related names for groups and user_permissions
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups'
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

class UserFile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    file = models.FileField(upload_to='uploads/')  
    uploaded_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.file.name} uploaded by {self.user} on {self.uploaded_at}"







