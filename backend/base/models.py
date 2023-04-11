from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import PROTECT
# Create your models here.

class UserProfile(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    company = models.CharField(max_length=1000, blank=True, null=True)
    phoneNumber = models.CharField(max_length=500, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=500, null=True, blank=True)
    placeId = models.CharField(max_length=500, null=True, blank=True)
    deleted = models.BooleanField(default=False)

class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=500, null=True, blank=True)
    fuel = models.CharField(max_length=500, null=True, blank=True)
    savings = models.CharField(max_length=500, null=True, blank=True)
    emissions = models.CharField(max_length=500, null=True, blank=True)
    safety = models.CharField(max_length=500, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

class Project(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    company = models.CharField(max_length=1000, blank=True, null=True)
    contactPerson = models.CharField(max_length=1000, blank=True, null=True)
    phoneNumber = models.CharField(max_length=500, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=500, null=True, blank=True)
    placeId = models.CharField(max_length=500, null=True, blank=True)
    deleted = models.BooleanField(default=False)




class Customer(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    type = models.CharField(max_length=500, null=True, blank=True)
    IDNumber = models.CharField(max_length=500, null=True, blank=True)
    firstName = models.CharField(max_length=500, null=True, blank=True)
    lastName = models.CharField(max_length=500, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phoneNumber = models.CharField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=500, null=True, blank=True)
    placeId = models.CharField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=500, null=True, blank=True)
    county = models.CharField(max_length=500, null=True, blank=True)
    gender = models.CharField(max_length=500, null=True, blank=True)
    age = models.CharField(max_length=500, null=True, blank=True)
    householdSize = models.CharField(max_length=500, null=True, blank=True)
    dateOfBirth = models.DateField(null=True, blank=True)
    incomeLevel = models.CharField(max_length=500, null=True, blank=True)
    maritalStatus = models.CharField(max_length=500, null=True, blank=True)
    educationLevel = models.CharField(max_length=500, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.firstName + ' ' + self.lastName

class Stove(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=1000, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.jpg')
    efficiency = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=1000, null=True, blank=True)
    date = models.DateField()
    price = models.DecimalField(decimal_places=2, default=0.00, max_digits=40)
    deleted = models.BooleanField(default=False)
    def __str__(self):
        return str(self.name)

    
class SMSMessage(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, null=True, blank=True)
    status_code = models.CharField(max_length=1000, null=True, blank=True) 
    status_desc = models.CharField(max_length=1000, null=True, blank=True) 
    message_id = models.CharField(max_length=1000, null=True, blank=True) 
    mobile_number = models.CharField(max_length=1000, null=True, blank=True)
    network_id = models.CharField(max_length=1000, null=True, blank=True) 
    message_cost = models.CharField(max_length=1000, null=True, blank=True) 
    credit_balance = models.CharField(max_length=1000, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

class OTP(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    secret = models.CharField(max_length=1000, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    otp = models.CharField(max_length=1000, null=True, blank=True)
    phoneNumber = models.CharField(max_length=1000, null=True, blank=True)
    deleted = models.BooleanField(default=False)

class TemperatureReading(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    stove = models.ForeignKey(Stove, on_delete=models.PROTECT, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    temperature = models.IntegerField(default=0)
    time = models.DateTimeField(max_length=1000, null=True, blank=True)
    location = models.CharField(max_length=1000, null=True, blank=True)
    deleted = models.BooleanField(default=False)
