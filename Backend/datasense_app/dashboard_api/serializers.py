from datasense_api.models import UserData, UserResults
from rest_framework import serializers
from django.contrib.auth.models import User


class UserDataSerializer(serializers.ModelSerializer):
    uploaded_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = UserData
        fields = ['file_name', 'uploaded_at', 'status', 'total_rows', 'total_columns']
        

class UserResultsSerializer(serializers.ModelSerializer):
    generated_at = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = UserResults
        fields = ['id','file_name','generated_at','result']

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        fields = ['username','email']