from django.urls import path
from .views import menu_items_list,generated_data,get_details,delete_generated,delete_account
urlpatterns = [
    path('data/', menu_items_list,name="user_data"),
    path('generated/',generated_data, name="generated_data" ),
    path('delete/', delete_generated, name="delete_generated"),
    path('profile/', get_details, name="get_details"),
     path('account/', delete_account, name="delete_account")
    
    
]