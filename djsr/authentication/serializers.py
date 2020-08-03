# djsr/authentication/serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *

# ...
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['user_type'] = user.user_type
        return token

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
    # is_active=serializers.BooleanField(default=False)
    class Meta:
        model = CustomUser
        fields = ('id','email', 'username', 'password','user_type')
        extra_kwargs = {'password': {'read_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        
        if instance is not None:
            print("in serializer",getattr(instance, 'is_active'))
            instance.set_password(password)
            if getattr(instance, 'user_type') == 'College':
                pass
            else:
                instance.is_active=False
            # instance.is_active = False
        instance.save()
        return instance


class Collegeserializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = College
        fields = ['id','college','phone','city','user','user_id']


class Professorserializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    is_active = serializers.CharField(source='user.is_active', read_only=True)
    
    class Meta:
        model = Professors
        fields = ['id','user','college','department','role','user_id','username','email','is_active']

class Studentserializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Students
        fields = ['id','college','enrollment','semester','department','user','user_id','username','email']


class Attendanceserializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id','username','enrollment','created_date','today_attendance']



