from django.urls import path
from .views import menu_items_list,generated_data,delete_generated
urlpatterns = [
    path('data/', menu_items_list,name="user_data"),
    path('generated/',generated_data, name="generated_data" ),
    path('delete/', delete_generated, name="delete_generated")
]