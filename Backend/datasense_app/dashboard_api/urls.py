from django.urls import path
from .views import menu_items_list,get_generated
urlpatterns = [
    path('data/', menu_items_list,name="user_data"),
    path('generated/',get_generated, name="generated-data" ),
]