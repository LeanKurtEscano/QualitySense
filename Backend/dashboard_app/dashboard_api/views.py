from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate,logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from .serializers import UserFileSerializer
from .models import CustomUser

# Create your views here.
@api_view(["POST"])
@login_required 
def upload_file(request):
    parser_classes = (MultiPartParser, FormParser)
    uploaded_file = request.FILES.get('file')
    
    if not uploaded_file.name.endswith(('.csv', '.xlsx')):
        return Response({"error": "Invalid file type. Please upload a CSV or Excel file."}, status=400)
    
    serializer = UserFileSerializer(data = request.data)
    

   
    
    if serializer.is_valid():
        serializer.save(user=request.user) 
        return Response({"Success: File is Succesfully uploaded "}, status=201)
    
    return Response(serializer.errors, status=400)    
   

@api_view(['POST','GET'])  
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
       
        if not email or not password:
            return Response({"error": "Invalid Credentials"}, status=400)
         
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            return Response({"success": "User Successfully Logged In"}, status=200)
        
        else:
            user_exist = CustomUser.objects.filter(email=email).exists()
            
            if user_exist:
                return Response({"error": "Incorrect Password"}, status=400)
            else:
                return Response({"error": "Email not found"}, status=400)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)  


def signup(request):
    pass

def logout(request):
    pass
    
