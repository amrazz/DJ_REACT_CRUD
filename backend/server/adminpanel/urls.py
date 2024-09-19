from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminUserView, admin_login

router = DefaultRouter()
router.register(r'users', AdminUserView)

urlpatterns = [
    path('admin-login/', admin_login, name='admin-login'),
    path('', include(router.urls))
]
