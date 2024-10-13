from rest_framework import serializers
from .models import UserFile, UserResults
from django.contrib.auth.models import User 

class UserFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = ['file']  
    
class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']


#class UserResultsSerializer(serializers.ModelSerializer):
#   class Meta:
# model = UserResults
#      fields = ['user','file_name','result']
