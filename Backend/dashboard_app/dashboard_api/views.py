from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import UserFileSerializer



# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_file(request):
    parser_classes = (MultiPartParser, FormParser)
    uploaded_file = request.FILES.get('file')
    print(uploaded_file)
    
    if not uploaded_file.name.endswith(('.csv', '.xlsx')):
        return Response({"error": "Invalid file type."}, status=400)
    
    serializer = UserFileSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user) 
        return Response({"Success: File is Succesfully uploaded "}, status=201)
    
    return Response(serializer.errors, status=400)    
   


@api_view(['POST'])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Invalid credentials"}, status=400)
        
        if User.objects.filter(email=email).exists():
           user_data = User.objects.get(email = email)      
           username = user_data.username
           user = authenticate(request, username=username, password=password)    
         
           refresh = RefreshToken.for_user(user)
           return Response({'refresh': str(refresh),'access': str(refresh.access_token)}, status=200)
        else:
            user_exist = User.objects.filter(email=email).exists()
            if user_exist:
                return Response({"error": "Incorrect password"}, status=400)
            else:
                return Response({"error": "Email not found"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        repeat_pass = request.data.get('confirm')

        if User.objects.filter(username=username).exists():
            return Response({"User": "Username already exists"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"Email": "Email is already in use"}, status=400)

        if password != repeat_pass:
            return Response({"Pass": "Passwords does not match"}, status=400)

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )
        user.save()
        return Response({"Success": "User registered successfully"}, status=201)

    except Exception as e:
        return Response({"Error": str(e)}, status=500)
   

def logout(request):
    pass
    
