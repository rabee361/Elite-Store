from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from utils.types import UserType



class User(AbstractBaseUser):
    user_type = models.CharField(choices=UserType.choices, max_length=50)
    USERNAME_FIELD='email'
    EMAIL_FIELD='email'
    REQUIRED_FIELDS=['username','email','idNumber','birth']
 
    def has_perm(self,perm, obj=None):
        return self.is_superuser

    def has_module_perms(self,app_label):  
        return self.is_superuser
    

class Merchant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

