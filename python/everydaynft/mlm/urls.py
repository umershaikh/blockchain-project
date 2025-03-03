from django.urls import path, re_path

from everydaynft.views import index
from .views import LevelUpView, get_mlm_profile, register_user, send_verification_code, NFTListAPIView

urlpatterns = [
    path('register/', register_user),
    path('send-verification-code/', send_verification_code),
    path('nfts/', NFTListAPIView.as_view(), name='nft-list'),
    path('profile/', get_mlm_profile, name='get_mlm_profile'),
    path('api/level-up/', LevelUpView.as_view(), name='level-up'),
]