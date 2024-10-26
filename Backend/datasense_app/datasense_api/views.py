from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserResults,UserData
from rest_framework.decorators import api_view, permission_classes,parser_classes,throttle_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import UserFileSerializer
from .Scripts.data_utils import dataset_overview
from django.core.cache import cache
import requests
from .Scripts.emails import send_otp_to_email,reset_password_otp
from .throttle import ResendThrottle, UploadThrottle
from dotenv import load_dotenv
import os

load_dotenv()

@api_view(["POST"])
@throttle_classes([ResendThrottle])
def reset_otp_password(request):
    try:
        email = request.data.get('email')
        
        if User.objects.filter(email = email).exists():         
           otp_generated = reset_password_otp(email)
           OTP_EXPIRATION_TIME = 120 
           cache.set(email, otp_generated, OTP_EXPIRATION_TIME)
           
           return Response({"message": "OTP sent successfully."}, status=202)
           
    except Exception as e:
        return Response({"error": "Something Went Wrong"}, status=500)
    
    

    

@api_view(["POST"])
def reset_password(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm')
        
        if password != confirm_password:
            return Response({"error", "Password does not match"}, status=400)
        
        else:     
            user = User.objects.get(email = email)
            user.set_password(password)
            user.save()
            return Response({"success": "Password has been reset successfully."}, status=200)

    except Exception as e:
        return Response({"error": "Something Went Wrong"}, status=500)
    
@api_view(["POST"])
def email_otp(request):
    try:
        email = request.data.get('email')
        user_otp = request.data.get('otpCode')
        
        
        cached_otp = cache.get(email)
        
        if cached_otp is None:
            return Response({"error": "OTP expired. Please request a new one."}, status=400)
        
        if str(cached_otp) == str(user_otp):
            return Response({"success": "email verified"}, status=200)
        else:
            return Response({"error": "Incorrect OTP. Please try again."}, status=400)
    
    except Exception as e:
            return Response({"error" : "Something Went Wrong"}, status=500)
    
@api_view(["POST"])
def user_email(request):
    try:
        email = request.data.get('email')
        
        if User.objects.filter(email = email).exists():         
           otp_generated = reset_password_otp(email)
           OTP_EXPIRATION_TIME = 120 
           cache.set(email, otp_generated, OTP_EXPIRATION_TIME)
           
           return Response({"message": "OTP sent successfully."}, status=202)
        else:
            return Response({"error" : "Email is not Registered"}, status=404)
           
    except Exception as e:
        return Response({"error": "Something Went Wrong"}, status=500)

@api_view(["POST"])
@throttle_classes([ResendThrottle])
def user_otp(request):
    try:
        email = request.data.get('email')
        otp_generated = send_otp_to_email(email)
        OTP_EXPIRATION_TIME = 120 
        cache.set(email, otp_generated, OTP_EXPIRATION_TIME)
       

    
        return Response({"Success": "OTP Sent"}, status = 200)
    except Exception as e:
        print(f"{e}")
    return Response({"error": "Verification failed"}, status= 400)



@api_view(["POST"])
def verify_otp(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        user_otp = request.data.get('otpCode')

      
        cached_otp = cache.get(email)

   
        if cached_otp is None:
            return Response({"error": "OTP expired. Please request a new one."}, status=400)

       
        if cached_otp and str(cached_otp) == str(user_otp):
            
            try:
                user = User.objects.create(
                    username=username,
                    email=email,
                    password=make_password(password)
                )
                user.save()

          
                refresh = RefreshToken.for_user(user)
                return Response({
                    "success": "Account is verified",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }, status=200)
            except :
                return Response({"error": "User with this email or username already exists."}, status=400)
        else:
            
            return Response({"error": "Incorrect OTP. Please try again."}, status=400)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)

    
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@throttle_classes([UploadThrottle])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    uploaded_file = request.FILES.get('file')

 
    if uploaded_file is None:
        return Response({"error": "Please provide a file"}, status=400)

    if not uploaded_file.name.endswith(('.csv', '.xlsx')):
        return Response({"Invalid": "Invalid file type."}, status=400)
    
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
        

        return Response({"success": "User pass data validation"}, status=200)

    except Exception as e:
        return Response({"Error": str(e)}, status=500)
   
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response({'Success': 'Logged out successfully'},status=200)



@api_view(['POST'])
def google_signin(request):
    code = request.data.get('code') 
    
    if not code:
        return Response({"error": "Authorization code is required"}, status=400)

   
    CLIENT_ID =  os.getenv("CLIENT_ID")
    
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")

    # Step 1: Exchange the authorization code for tokens
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': 'http://localhost:5173',  
        'grant_type': 'authorization_code',
    }

    token_response = requests.post(token_url, data=token_data)
    
    
    if token_response.status_code != 200:
        return Response({"error": "Failed to obtain access token"}, status=token_response.status_code)

    # Step 2: Verify the ID token
    try:
        token_info = token_response.json()
        access_token = token_info.get('access_token')
        
        userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {
        "Authorization": f"Bearer {access_token}",
        }

        userinfo_response = requests.get(userinfo_url, headers=headers)
       
        if userinfo_response.status_code != 200:
            return Response({"error": "Failed to fetch user info"}, status=userinfo_response.status_code)

        user_info = userinfo_response.json()
        email = user_info['email']
        username = user_info['name']
        

        user, created = User.objects.get_or_create(email=email, defaults={'username': username})

        #Step 3: Generate tokens 
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            "access_token": access_token,
            "refresh_token": refresh_token,
            "Success": "Login successful"
        }, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
