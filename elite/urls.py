from django.contrib import admin
from django.urls import path,include




urlpatterns = [
    path('supersecureadmin/', admin.site.urls),
    path('admin/', include('admin_panel.urls')),
    # path('merchant/', include('merchant.urls')),
    # path('api/', include('core.urls')),
]
