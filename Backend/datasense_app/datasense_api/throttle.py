from rest_framework.throttling import AnonRateThrottle,BaseThrottle, UserRateThrottle
import logging
import time
from django.core.cache import cache



class ResendThrottle(AnonRateThrottle):
    rate = '2/minute' 

class UploadThrottle(BaseThrottle):
    rate = 1  # Max requests allowed
    duration = 120  # Time window in seconds (2 minutes)

    def __init__(self):
        self.history = None

    def allow_request(self, request, view):
        # Only apply throttle to authenticated users
        if not request.user.is_authenticated:
            return True  # No throttling for unauthenticated users

        # Unique identifier for authenticated user
        user_id = request.user.id
        cache_key = f"throttle_{user_id}"

        # Fetch the request history from cache
        self.history = cache.get(cache_key, [])

        # Current time
        now = time.time()

        # Clean the history to remove outdated requests outside the duration
        self.history = [timestamp for timestamp in self.history if now - timestamp < self.duration]

        # Check if the history exceeds the rate limit
        if len(self.history) >= self.rate:
            return False

        # Update the request history and store it in cache
        self.history.append(now)
        cache.set(cache_key, self.history, self.duration)
        return True

    def wait(self):
        # Calculate how much time remains until the next allowed request
        if self.history:
            remaining = self.duration - (time.time() - self.history[0])
            return max(remaining, 0)
        return None