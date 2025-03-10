from django.urls import path, re_path

from everydaynft.views import index
from .views import LevelUpView, create_payment, get_mlm_profile, payment_callback, register_user, send_verification_code, NFTListAPIView, user_balance

urlpatterns = [
    path('register/', register_user),
    path('send-verification-code/', send_verification_code),
    path('nfts/', NFTListAPIView.as_view(), name='nft-list'),
    path('profile/', get_mlm_profile, name='get_mlm_profile'),
    path('level-up/', LevelUpView.as_view(), name='level-up'),
    path('create-payment/', create_payment, name='create_payment'),
    path('payment-callback/', payment_callback, name='payment_callback'),
    path('user-balance/', user_balance, name='user_balance'),
]