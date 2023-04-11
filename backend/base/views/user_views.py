from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken, SMSMessageSerializer
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.mail import EmailMessage
from django.template.loader import get_template
from base.models import UserProfile, SMSMessage, OTP
from django.db.utils import IntegrityError
import pyotp
import json
import requests


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    if UserProfile.objects.filter(phoneNumber=data['phoneNumber'], deleted=False).exists():
        message = 'User with this Phone Number already exists'
        return Response({'detail':message}, status=status.HTTP_400_BAD_REQUEST)

    
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        profile = UserProfile.objects.create(
            phoneNumber=data['phoneNumber'],
            company=data['company'],
            location=data['location'],
            placeId=data['placeId'],
            user = user
            
        )
        url = "https://api.mobitechtechnologies.com/sms/sendsms"


        payload = json.dumps({
            "mobile": profile.phoneNumber,
            "response_type": "json",
            "sender_name": "23107",
            "service_id": 0,
            "message": "Dear " + profile.company+ "," + "\nWelcome to Stoves Monitoring"
        })
        headers = {
            'h_api_key': 'abab5c43fb6e0bee3ff8ebe2424ecda1a45321195dc410aa6743a9736798b329',
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        data = json.loads(response.text)

        message = SMSMessage.objects.create(
            user=user,
            status_code= data[0]['status_code'],
            status_desc=data[0]['status_desc'],
            message_id=data[0]['message_id'],
            mobile_number=data[0]['mobile_number'],
            network_id=data[0]['network_id'],
            message_cost=data[0]['message_cost'],
            credit_balance=data[0]['credit_balance'],
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except IntegrityError:
        message = 'User with this email already exists'
        return Response({'detail':message}, status=status.HTTP_400_BAD_REQUEST)

    except:
        pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.last_name = data['last_name'] 
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

@api_view(['POST'])
def resetOTP(request):
    data = request.data
    print(data)
    if not UserProfile.objects.filter(phoneNumber=data['phoneNumber']).exists():
        return Response({'detail':'User with given phone number does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = User.objects.get(userprofile__phoneNumber=data['phoneNumber'])

    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret, interval=600)
    code = totp.now()

    url = "https://api.mobitechtechnologies.com/sms/sendsms"


    payload = json.dumps({
        "mobile": data['phoneNumber'],
        "response_type": "json",
        "sender_name": "23107",
        "service_id": 0,
        "message": "Your OTP code is: " +code 
    })
    headers = {
        'h_api_key': 'abab5c43fb6e0bee3ff8ebe2424ecda1a45321195dc410aa6743a9736798b329',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    data = json.loads(response.text)

    message = SMSMessage.objects.create(
        user=user,
        status_code= data[0]['status_code'],
        status_desc=data[0]['status_desc'],
        message_id=data[0]['message_id'],
        mobile_number=data[0]['mobile_number'],
        network_id=data[0]['network_id'],
        message_cost=data[0]['message_cost'],
        credit_balance=data[0]['credit_balance'],
    )

    otp = OTP.objects.create(
        user=user,
        phoneNumber=request.data['phoneNumber'],
        otp=code,
        secret=secret
    )

    serializer = SMSMessageSerializer(message, many=False)
    
    if data[0]['status_code'] == '1000':
        return Response(serializer.data)
    else:
        return Response({'detail':data[0]['status_desc']}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verifyOTP(request):
    data = request.data
    try:
        otp_obj = OTP.objects.filter(otp=data['otp']).order_by('-createdAt').first()
        secret = otp_obj.secret
    except:
        return Response({'detail':'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)
    totp = pyotp.TOTP(secret, interval=600)

    if totp.verify(data['otp']):
        serializer = UserSerializerWithToken(otp_obj.user, many=False)
        return Response(serializer.data)
    else:
        return Response({'detail':'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)
    

    