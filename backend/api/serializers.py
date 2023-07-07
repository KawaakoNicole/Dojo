from rest_framework import serializers
# from .models import Task, UserAccount
from .models import Task
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields='__all__'
        

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=60, write_only=True)
    email = serializers.EmailField(max_length=150)
    first_name=serializers.CharField(max_length=50)
    last_name=serializers.CharField(max_length=50)
    username=serializers.CharField(max_length=50)
    
    class Meta:
        model = User
        fields = ['id','username', 'first_name', 'last_name', 'email', 'password']
        
        
    def validate(self, attrs):
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'error': 'Username already exits'})
        return super().validate(attrs)
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
