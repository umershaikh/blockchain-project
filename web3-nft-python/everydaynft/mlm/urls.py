from django.urls import path, re_path

from everydaynft.views import index
from .views import register_user, send_verification_code, NFTListAPIView

urlpatterns = [
    path('register/', register_user),
    path('send-verification-code/', send_verification_code),
    path('nfts/', NFTListAPIView.as_view(), name='nft-list'),
]