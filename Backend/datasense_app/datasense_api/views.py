from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserResults,UserData
from rest_framework.decorators import api_view, permission_classes,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import UserFileSerializer
from .Scripts.data_utils import dataset_overview


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    uploaded_file = request.FILES.get('file')

    # Check if the file is valid
    if uploaded_file is None:
        return Response({"error": "Please provide a file"}, status=400)

    if not uploaded_file.name.endswith(('.csv', '.xlsx')):
        return Response({"error": "Invalid file type."}, status=400)
    
    file_name = uploaded_file.name

    serializer = UserFileSerializer(data=request.data)

    if serializer.is_valid():
        try:
           
            total_rows, total_columns, file_columns, null_count, result = dataset_overview(uploaded_file)

            user_results = UserResults.objects.create(user=request.user, file_name=file_name, result=result)
            user_data = UserData.objects.create(
                user=request.user,
                file_name=file_name,
                status="Success",
                total_rows=total_rows,
                total_columns=total_columns
            )
            serializer.save(user=request.user)

            return Response({
                "success": "File successfully uploaded",
                "total_rows": total_rows,
                "total_columns": total_columns,
                "columns": file_columns,
                "na_values": null_count,
                "result": result,
            }, status=201)

        except Exception as e:
     
            user_data = UserData.objects.create(
                user=request.user,
                file_name=file_name,
                status="Failed",
                total_rows=0,  
                total_columns=0
            )
            return Response({"error": str(e)}, status=500)
    
    return Response(serializer.errors, status=400)




@api_view(['POST'])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

      
        if not email or not password:
            return Response({"Invalid": "Email and password are required"}, status=400)

        
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response({"Email": "Email not found"}, status=404)

        username = user.username
        user = authenticate(request, username=username, password=password)
        
        if user is None:
            return Response({"Pass": "Incorrect password"}, status=401)

        refresh = RefreshToken.for_user(user)
        return Response({'success':"User successfully login",
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        repeat_pass = request.data.get('confirm')
        
        if not username or not email or not password or not repeat_pass:
            return Response({"Invalid": "Please fill out all fields"},status=400)

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
   
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response({'Success': 'Logged out successfully'},status=200)
    
