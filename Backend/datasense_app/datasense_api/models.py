from django.db import models

from django.contrib.auth.models import User 



class UserFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    file = models.FileField()  
    uploaded_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.file.name} uploaded by {self.user} on {self.uploaded_at}"
    
class UserResults(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=400)
    result = models.TextField()

    def __str__(self):
        return f"Result for {self.file_name} by {self.user}"
