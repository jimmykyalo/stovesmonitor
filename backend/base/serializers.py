
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    phoneNumber = serializers.SerializerMethodField(read_only=True)
    placeId = serializers.SerializerMethodField(read_only=True)
    location = serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'phoneNumber']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_phoneNumber(self, obj):
        return obj.userprofile.phoneNumber

    def get_company(self, obj):
        return obj.userprofile.company
    
    def get_location(self, obj):
        return obj.userprofile.location
    
    def get_placeId(self, obj):
        return obj.userprofile.placeId

    def get_name(self, obj):
        name = obj.first_name + ' ' + obj.last_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'phoneNumber', 'token', 'location', 'placeId', 'company']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class CustomerSerializer(serializers.ModelSerializer):

    customerName = serializers.SerializerMethodField(read_only=True)

    
    

    def get_customerName(self, obj):
        
        return obj.firstName + ' ' + obj.lastName


    class Meta:
        model = Customer
        fields = '__all__'


class SMSMessageSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = SMSMessage
        fields = '__all__'



