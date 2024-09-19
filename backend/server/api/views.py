from django.shortcuts import render
from .models import UserProfile, User
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser 
from .serializers import (
    UserSerializers,
    UserProfileSerializers,
    UserRegisterSerializers,
    UserLoginSerializers,
)
from rest_framework.permissions import AllowAny, IsAuthenticated


# Create your views here.


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializers(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "User created successfully",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response({'error': 'Registration failed', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializers(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful",
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        username = request.GET.get('username')
        if username:
            print(f"Username: {username} got inside the get method")
        else:
            return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:

            user = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializers(profile, context={'request' : request})
            print(serializer.data)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request):
        username = request.GET.get('username')
        if username:
            print("i have the put username")
        try:
            user = User.objects.get(username = username)
            print(user.first_name)
            profile = UserProfile.objects.get(user = user)
            print(profile.profile_image)
            print(f"this is the request data : {request.data}")
            serializer = UserProfileSerializers(profile, data = request.data, partial = True)
            if serializer.is_valid():
                print(f"serializer data : {serializer.validated_data}") 
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status = status.HTTP_404_NOT_FOUND)    
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found"}, status = status.HTTP_404_NOT_FOUND)
    
    
class UserUpdateView(APIView):
    permission_classes = [AllowAny]
    
    def put(self, request):
        print(f"this is the request data inside the user update view : {request.data}")
        username = request.GET.get('username')
        print(f"this is the username inside the user update view : {username}")
        if not username:
            return Response({"error" : "User not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.get(username = username)
        except User.DoesNotExist:
            return Response({"error" : "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializers(user, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            
    