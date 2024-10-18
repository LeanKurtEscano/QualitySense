from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

class ResendThrottle(AnonRateThrottle):
    rate = '2/minute' 

class UploadThrottle(UserRateThrottle):
    rate = '2/minute'
