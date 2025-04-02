from django.shortcuts import render
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from utils.views import CustomListBaseView

# Create your views here.
login_required_m =  method_decorator(login_required(login_url='login') , name="dispatch")


class LoginView(View):
    def get(self, request):
        return render(request, 'admin_panel/login.html', context={})

    def post(self, request): 
        phonenumber = request.POST.get('phonenumber', None)
        password = request.POST.get('password', None)
        remember_me = request.POST.get('remember_me', False)
        
        context = {
            'phonenumber': phonenumber,
            'has_error': False,
            'phone_error': False,
            'password_error': False
        }
        
        if not phonenumber or not password:
            context['has_error'] = True
            if not phonenumber:
                context['phone_error'] = True
            if not password:
                context['password_error'] = True
            return render(request, 'admin_panel/login.html', context=context)
        user = authenticate(request, phonenumber=phonenumber, password=password)
        if user:
            login(request, user)
            if not remember_me:
                request.session.set_expiry(60*60*4)  # 4 hours
            else:
                request.session.set_expiry(0)  # Expire when browser closes
            request.session.modified = True
            return redirect('dashboard')
        else:
            context['has_error'] = True
            context['phone_error'] = True
            context['password_error'] = True
            return render(request, 'admin_panel/login.html', context=context)

@login_required_m
class LogoutView(View):
    def post(self, request):
        logout(request)
        return redirect('login')



class DashboardView(View):
    def get(self, request):
        return render(request, 'admin_panel/dashboard.html',context={})


class DashboardPartialView(View):
    def get(self, request):
        return render(request, 'admin_panel/partials/dashboard_partial.html')


# @login_required_m
# class ListCatalogsView(CustomListBaseView):
#     # model = Catalog
#     context_object_name = 'catalogs'
#     context_fields = ['id','catalog_type','organization','visits','short_url']
#     template_name = 'admin_panel/organization/catalogs/catalogs.html' 

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         for catalog in context['catalogs']:
#             catalog.short_url = self.request.build_absolute_uri(catalog.get_absolute_url())
#         return context

#     def get_queryset(self):
#         queryset = super().get_queryset().select_related('organization')
#         q = self.request.GET.get('q', '')
#         if self.request.htmx:
#             self.template_name = 'admin_panel/partials/catalogs_partial.html'
#         if q:
#             return queryset.filter(organization__name__icontains=q)
#         else:
#             return queryset


class ListCatalogsView(View):
    def get(self, request):
        return render(request, 'admin_panel/catalogs/catalogs.html',context={})