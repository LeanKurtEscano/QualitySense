from rest_framework import serializers
from .models import UserFile, UserResults

class UserFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = ['file']  

#class UserResultsSerializer(serializers.ModelSerializer):
#   class Meta:
# model = UserResults
#      fields = ['user','file_name','result']