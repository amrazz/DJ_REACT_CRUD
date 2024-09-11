from rest_framework import status
from django.shortcuts import render
from .models import UserProfile, User
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializers, UserProfileSerializers, UserRegisterSerializers, UserLoginSerializers
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializers(data = request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class UserLoginView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializers(data = request.data)
        
        if serializer.is_valid():
            user = serializer.validate_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                "message" : "Login successful",
                "access_token" : str(refresh.access_token),
                "refresh_token" : str(refresh)
            }, status=status.HTTP_200_OK)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)