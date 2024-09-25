from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
urlpatterns = [
    path("token/", TokenObtainPairView.as_view(),name = "get_token"),
    path("refresh/", TokenRefreshView.as_view(),name = "refresh_token"),
    path('upload/', views.upload_file, name='upload'),
    path('signup/', views.signup, name = 'signup'),
    path('login/', views.login, name = 'login'),
    path('logout/', views.log_out, name= 'logout'),
]