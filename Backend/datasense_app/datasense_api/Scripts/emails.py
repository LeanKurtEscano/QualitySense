from django.core.mail import send_mail
import random
from django.conf import settings


# Constants
OTP_EXPIRATION_TIME = 300 
def send_otp_to_email(email):
    try:
        otp = random.randint(100000, 999999)  
        
        subject = 'Your Account Verification Code'
        message = f'Your OTP for account verification is: {otp}. Please use this code to complete the verification process.'
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from,[email])
        return otp
     
    
    except Exception as e:
        print({e})
        return None
   
    
    
    
    

