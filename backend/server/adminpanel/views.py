from .utils import get_tokens_for_user
from .serializers import UserSerializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from api.serializers import UserProfileSerializers


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    print("My name is admin login")
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user and user.is_superuser:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    return Response({'error': 'Invalid credentials or not an Admin'}, status=status.HTTP_401_UNAUTHORIZED)


class AdminUserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [permissions.IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'user': serializer.data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            profile_data = request.data.get('profile', {})
            profile_image = profile_data.get('profile_image')
            if profile_image:
                profile, created = UserProfile.objects.get_or_create(user=user)
                profile.profile_image = profile_image
                profile.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'user': serializer.data,
                'tokens': tokens
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

