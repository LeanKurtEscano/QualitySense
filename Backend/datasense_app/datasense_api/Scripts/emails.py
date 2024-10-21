from django.core.mail import send_mail
import random
from django.conf import settings

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
   
def reset_password_otp(email):
    try:
        otp = random.randint(100000, 999999)  
    
        subject = 'Reset Your Password'
        message = f'Your OTP for resetting your password is: {otp}. Please use this code to reset your password. If you did not request this, please ignore this message.'

        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from,[email])
        return otp
     
    
    except Exception as e:
        print({e})
        return None
    
    
    

