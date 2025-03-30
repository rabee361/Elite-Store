from django.contrib import admin
from django.urls import path




urlpatterns = [
    path('supersecureadmin/', admin.site.urls),
    path('admin/', admin.site.urls),
    path('merchant/', admin.site.urls),
    path('api/', admin.site.urls),
]
