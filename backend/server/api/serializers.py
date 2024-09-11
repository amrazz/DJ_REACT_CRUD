from .models import User, UserProfile
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class UserProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class UserSerializers(serializers.ModelSerializer):
    profile = UserProfileSerializers(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username" "email",
            "first_name",
            "last_name" "password",
            "profile",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "profile": {"required": False},
        }


class UserRegisterSerializers(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, label="Confirm password")

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password2",
        ]

    def validate(self, data):
        password = data.get('password')
        password2 = data.pop('password2', None)
        if password != password2:
            raise serializers.ValidationError("Passwords do not match.")
        return data


    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializers(serializers.ModelSerializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Username and password are required")
        
        user = autenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        
        data['user'] = user
        return data
            