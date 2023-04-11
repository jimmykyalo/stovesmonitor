from django.contrib import admin

from .models import *

# Register your models here.
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('_id', 'user', 'phoneNumber', 'company')
    list_display_links = ('_id',)

class SMSAdmin(admin.ModelAdmin):
    list_display = ('_id', 'user', 'status_code', 'status_desc', 'mobile_number', 'credit_balance')
    list_display_links = ('_id',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'fuel', 'user')
    list_display_links = ('_id','name')

    def product_name(self, obj):
        return obj.name + ' ' + obj.size


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('_id', 'firstName', 'lastName','phoneNumber')
    list_display_links = ('_id', 'firstName')

    


    

admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(SMSMessage, SMSAdmin)


