from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile


class UserSerializers(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }
        
class UserProfileSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only=True)
    class Meta:
        model = UserProfile
        fields = ['user', 'profile_image']
        
        def get_profile_image(self, obj):
            request = self.context.get('request')
            if obj.profile_image and request:
                return request.build_absolute_uri(obj.profile_image.url)
            return None
        
        # def update(self, instance, validated_data):
            


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


    def validate_username(self, value):
        print("This is in username and this is value", value)
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already in use")
        return value

    def validate_email(self, value):
        print("This is in email and this is value", value)
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email address is already registered")
        return value

    def validate(self, data):
        print("This is in validate and this is data", data)
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': 'Passwords do not match'})
        return data
    
    def create(self, validated_data):
        print("This is in create and this is validated data", validated_data)
        password = validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializers(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def validate(self, data):
        print("This is login data", data)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            print("No user and pass")
            raise serializers.ValidationError("Username and password are required")

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        return {
            'user': user,
            'username': username,
            'password': password
        }
