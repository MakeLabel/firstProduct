from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth
from django.shortcuts import redirect
from .models import Profile
# from .forms import LoginForm

# Create your views here.

def login(request):
    # form = LoginForm()
    return render(request, 'accounts/login.html')


    