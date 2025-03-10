import uuid
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from mlm.utils import can_level_up
from .models import Level, MLMUser, NFT, LevelRequirement, EmailVerification
from rest_framework import status
import random, requests, logging, os, string
from rest_framework.decorators import api_view, permission_classes
from rest_framework import views
from rest_framework.views import APIView
from .serializers import NFTSerializer, MLMUserSerializer, OrderHistorySerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.core.mail import send_mail
from datetime import datetime, timedelta
from dotenv import load_dotenv
from .models import Payment
from mlm import models

load_dotenv()

class LevelUpView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            mlm_user = MLMUser.objects.get(user=request.user)
            next_level = mlm_user.level + 1
            level = Level.objects.get(number=next_level)

            direct_referrals = mlm_user.get_direct_referrals_count()
            indirect_referrals = mlm_user.get_indirect_referrals_count()
            avg_referral_percentage = (
                (direct_referrals / level.needed_a if level.needed_a > 0 else 1) +
                (indirect_referrals / level.needed_bc if level.needed_bc > 0 else 1)
            ) / 2 * 100

            if avg_referral_percentage < 100:
                return Response({"error": "Referral requirements not met"}, status=status.HTTP_400_BAD_REQUEST)

            mlm_user.level = next_level
            mlm_user.save()
            return Response({"new_level": next_level}, status=status.HTTP_200_OK)
        except Level.DoesNotExist:
            return Response({"error": "Next level not defined"}, status=status.HTTP_400_BAD_REQUEST)
        except MLMUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
def get_downline_grades(user_mlm):
    """
    Returns (direct_count, bc_count).
    direct_count = Grade A
    bc_count = Grade B + C
    """
    gradeA = MLMUser.objects.filter(upline=user_mlm)
    gradeB = MLMUser.objects.filter(upline__in=gradeA)
    gradeC = MLMUser.objects.filter(upline__in=gradeB)
    return (gradeA.count(), gradeB.count() + gradeC.count())

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_mlm_profile(request):
    try:
        mlm_user = MLMUser.objects.get(user=request.user)
    except MLMUser.DoesNotExist:
        return Response({'error': 'MLMUser profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    user_data = {
        'username': mlm_user.user.username,
        'first_name': mlm_user.user.first_name,
        'last_name': mlm_user.user.last_name,
        'referral_code': mlm_user.referral_code,
        'level': mlm_user.level,
    }

    direct_count = mlm_user.get_direct_referrals_count()
    bc_count = mlm_user.get_indirect_referrals_count()
    user_data['active_a_referrals'] = direct_count
    user_data['active_bc_referrals'] = bc_count

    next_level = mlm_user.level + 1
    try:
        level = Level.objects.get(number=next_level)
        user_data['needed_a'] = level.needed_a
        user_data['needed_bc'] = level.needed_bc
    except Level.DoesNotExist:
        user_data['needed_a'] = 0
        user_data['needed_bc'] = 0

    return Response(user_data, status=status.HTTP_200_OK)

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
    if len(password) < 6:
        return Response({'error': 'Password too short, minimum 6 chars'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    # Check the verification code
    try:
        ev = EmailVerification.objects.get(email=email)
    except EmailVerification.DoesNotExist:
        return Response({'error': 'No verification code requested'}, status=status.HTTP_400_BAD_REQUEST)

    if ev.code.strip() != verification_code.strip():
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

    # New users always start at level 0 with 0 points
    new_user_level = 0
    new_user_points = 0

    # Handle referral code logic
    referral_code = request.data.get('referral_code')
    if referral_code:
        # If referral code is provided, verify that it exists.
        referrer = MLMUser.objects.filter(referral_code=referral_code).first()
        if not referrer:
            return Response({'error': 'Invalid referral code'}, status=status.HTTP_400_BAD_REQUEST)
        
        # For direct referrer: add bonus points (10% of needed points to level up)
        try:
            req = LevelRequirement.objects.get(level_number=referrer.level + 1)
            direct_bonus = int(req.needed_points * 0.10)
        except LevelRequirement.DoesNotExist:
            direct_bonus = 0
        referrer.points += direct_bonus
        referrer.save()

        # For the upliner of the referrer (if exists): add indirect bonus (5%)
        if referrer.upline:
            try:
                req_upline = LevelRequirement.objects.get(level_number=referrer.upline.level + 1)
                indirect_bonus = int(req_upline.needed_points * 0.05)
            except LevelRequirement.DoesNotExist:
                indirect_bonus = 0
            referrer.upline.points += indirect_bonus
            referrer.upline.save()

        upline = referrer
    else:
        upline = None

    # Generate a unique 6-letter referral code for the new user
    unique_referral_code = generate_referral_code()

    MLMUser.objects.create(
        user=user,
        upline=upline,
        referral_code=unique_referral_code,
        level=new_user_level,
        points=new_user_points
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


class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        current_level = profile.get_current_level()
        direct_count = profile.get_direct_referrals_count()
        indirect_count = profile.get_indirect_referrals_count()
        total_downline = direct_count + indirect_count

        next_level = Level.objects.filter(number=current_level + 1).first()
        if next_level:
            required_direct = next_level.required_direct
            required_indirect = next_level.required_indirect
            direct_progress = min(direct_count / required_direct, 1.0) if required_direct > 0 else 1.0
            indirect_progress = min(indirect_count / required_indirect, 1.0) if required_indirect > 0 else 1.0
            overall_progress = min(direct_progress, indirect_progress)
        else:
            required_direct = 0
            required_indirect = 0
            direct_progress = 1.0
            indirect_progress = 1.0
            overall_progress = 1.0

        data = {
            'username': request.user.username,
            'current_level': current_level,
            'direct_referrals': direct_count,
            'indirect_referrals': indirect_count,
            'total_downline': total_downline,
            'next_level': next_level.number if next_level else None,
            'required_direct': required_direct,
            'required_indirect': required_indirect,
            'direct_progress': direct_progress * 100,
            'indirect_progress': indirect_progress * 100,
            'overall_progress': overall_progress * 100,
            'referral_code': profile.referral_code,
        }
        return Response(data)
    
logger = logging.getLogger(__name__)

def get_jwt_token():
    url = "https://api.nowpayments.io/v1/auth"
    payload = {
        "email": os.getenv('NOWPAYMENTS_EMAIL'),
        "password": os.getenv('NOWPAYMENTS_PASSWORD')
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return response.json().get('token')
    else:
        print(response.json())
        return None

NOWPAYMENTS_API_KEY = os.getenv('NOWPAYMENTS_API_KEY')

@api_view(['POST'])
def create_payment(request):
    amount = request.data.get('amount')
    user_id = request.data.get('user_id')

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Generate a unique order_id (e.g., user_id-timestamp-uuid)
    order_id = f"ORDER_{user_id}_{int(datetime.now().timestamp())}_{uuid.uuid4().hex[:8]}"

    payload = {
        "price_amount": amount,
        "price_currency": "usd",
        "pay_currency": "usdttrc20",
        "order_id": order_id,
        "order_description": f"Deposit from User {user.username} (ID: {user_id})",
        "success_url": f"https://everydaynft.com/profile?deposit_success=true",  # Redirect to profile with success param
        "cancel_url": "https://everydaynft.com/cancel"
    }

    headers = {
        'x-api-key': os.getenv('NOWPAYMENTS_API_KEY'),
        'Content-Type': 'application/json'
    }

    response = requests.post('https://api.nowpayments.io/v1/invoice', headers=headers, json=payload)
    print(response.status_code)
    if response.status_code == 200:
        data = response.json()
        Payment.objects.create(
            user=user,
            order_id=order_id,
            transaction_id=data["id"],
            amount_usd=data["price_amount"],
            pay_address=data.get("pay_address", ""),
            email=user.username,
            status="pending"
        )
        return Response({"payment_url": data["invoice_url"]}, status=status.HTTP_201_CREATED)
    else:
        return Response(response.json(), status=response.status_code)

@api_view(['GET'])
def user_balance(request):
    user_id = request.query_params.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        balance = Payment.objects.filter(user=user, status='completed').aggregate(total=models.Sum('amount_usd'))['total'] or 0
        return Response({"balance": float(balance)}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def payment_callback(request):
    data = request.data
    order_id = data.get('order_id')
    payment_status = data.get('payment_status')
    blockchain_txid = data.get('transaction_id')

    try:
        payment = Payment.objects.get(order_id=order_id)
        payment.status = payment_status
        payment.blockchain_txid = blockchain_txid
        payment.save()
        return Response({"status": "success"}, status=status.HTTP_200_OK)
    except Payment.DoesNotExist:
        return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
