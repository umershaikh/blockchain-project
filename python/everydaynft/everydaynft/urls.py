from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('mlm.urls')),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r'^.*$', index),
]
