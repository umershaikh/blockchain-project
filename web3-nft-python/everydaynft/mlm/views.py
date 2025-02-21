from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MLMUser, NFT
from rest_framework import status
import random
import string
from rest_framework.views import APIView
from .models import NFT
from .serializers import NFTSerializer
from django.utils import timezone
from django.core.mail import send_mail
from datetime import timedelta
from .models import EmailVerification

@api_view(['POST'])
def send_verification_code(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=400)

    ev, created = EmailVerification.objects.get_or_create(email=email)

    if ev.times_requested >= 3:
        cutoff = ev.created_at + timedelta(hours=24)
        if timezone.now() < cutoff:
            return Response({'error': 'You have exceeded the max attempts. Try again in 24 hours.'}, status=403)
        else:
            ev.times_requested = 0  # Reset after 24 hours

    code = ''.join(random.choices(string.digits, k=6))
    ev.code = code
    ev.created_at = timezone.now()
    ev.times_requested += 1
    ev.save()

    # Ensure send_mail() does not block the response.
    send_mail(
        subject='Your Verification Code',
        message=f'Your code is {code}. It expires in 5 minutes.',
        from_email='umerodesk@gmail.com',
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({
        'message': 'Verification code sent successfully',
        'times_requested': ev.times_requested,
    })

def generate_referral_code():
    while True:
        # Generate a random 6-character alphanumeric string
        referral_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))

        # Ensure the referral code is unique
        if not MLMUser.objects.filter(referral_code=referral_code).exists():
            return referral_code

@api_view(['POST'])
def register_user(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    verification_code = request.data.get('verification_code')

    # Basic validations
    if not first_name or not last_name or not email or not password:
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
    if password != confirm_password:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    # Example: check password strength
    if len(password) < 6:
        return Response({'error': 'Password too short, minimum 6 chars'}, status=status.HTTP_400_BAD_REQUEST)
    # You could add more advanced checks here (uppercase, special char, etc.)

    # Check if email already registered
    if User.objects.filter(username=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    # Check the verification code
    try:
        ev = EmailVerification.objects.get(email=email)
    except EmailVerification.DoesNotExist:
        return Response({'error': 'No verification code requested'}, status=status.HTTP_400_BAD_REQUEST)

    if ev.code != verification_code:
        return Response({'error': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)

    if ev.is_expired():
        return Response({'error': 'Verification code expired'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the new user
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )

    # Handle referral code logic
    referral_code = request.data.get('referral_code')
    if referral_code:
        # If referral code is provided, verify that it exists.
        upline = MLMUser.objects.filter(referral_code=referral_code).first()
        if not upline:
            return Response({'error': 'Invalid referral code'}, status=status.HTTP_400_BAD_REQUEST)
        level = upline.level + 1
    else:
        upline = None
        level = 1

    # Generate a unique 6-letter referral code for the new user
    unique_referral_code = generate_referral_code()

    MLMUser.objects.create(
        user=user,
        upline=upline,
        referral_code=unique_referral_code,
        level=level
    )

    # Mark the verification code as used (or delete it)
    ev.delete()

    return Response({'message': 'User registered successfully'})

class NFTListAPIView(APIView):
    """
    Get all NFTs in the system.
    """
    def get(self, request):
        nfts = NFT.objects.all()
        serializer = NFTSerializer(nfts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
