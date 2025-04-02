from django.urls import path
from .views import users_views


urlpatterns = [
    path('login/' , users_views.LoginView.as_view() , name="login"),
    path('logout/' , users_views.LogoutView.as_view() , name="logout"),
    path('' , users_views.DashboardView.as_view() , name="dashboard"),
    path('partial/' , users_views.DashboardPartialView.as_view() , name="dashboard-partial"),
    path('catalogs/' , users_views.ListCatalogsView.as_view() , name="catalogs"),
    ]
    