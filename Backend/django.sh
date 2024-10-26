#!/bin/bash

# Run Django migrations
cd /app/datasense_app
python manage.py makemigrations
python manage.py migrate

# Start the Django server
python manage.py runserver 0.0.0.0:8000
