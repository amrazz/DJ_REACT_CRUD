from rest_framework import serializers
from django.contrib.auth.models import User
from api.serializers import UserProfileSerializers

class UserSerializers(serializers.ModelSerializer):
    profile = UserProfileSerializers(read_only=True) 
    created_at = serializers.DateTimeField(source='date_joined', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'profile', 'created_at'
        ]