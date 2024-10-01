from django.urls import path
from .views import menu_items_list
urlpatterns = [
    path('data/', menu_items_list,name="user_data")
]