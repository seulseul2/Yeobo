from django.shortcuts import render
from .models import User

# Create your views here.
x = User.objects.all()
print(x)