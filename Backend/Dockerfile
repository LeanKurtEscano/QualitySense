FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .  
RUN pip install -r requirements.txt

# Copy the entire backend directory contents to /app
COPY . .

# Ensure the script is executable
RUN chmod +x django.sh

# Set the command to run the script
CMD ["./django.sh"]
