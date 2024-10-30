

from django.contrib import admin
from .models import UserData


class UserDataAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'uploaded_at', 'status', 'total_rows', 'total_columns') 

# Register the model with optional customization
admin.site.register(UserData, UserDataAdmin)