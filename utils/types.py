from django.db import models

class UserType(models.TextChoices):
    CLIENT = 'CLIENT'
    SHAREEK = 'SHAREEK'
    ADMIN = 'ADMIN'

class CodeTypes(models.TextChoices):
    SIGNUP = 'SIGNUP'
    RESET_PASSWORD = 'RESET_PASSWORD'
    FORGET_PASSWORD = 'FORGET_PASSWORD'

