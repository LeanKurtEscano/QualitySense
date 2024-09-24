from rest_framework import serializers
from .models import UserFile

class UserFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFile
        fields = ['file', 'uploaded_at']  

    def create(self, validated_data):
        
        user = self.context['request'].user
        return UserFile.objects.create(user=user, **validated_data)

  