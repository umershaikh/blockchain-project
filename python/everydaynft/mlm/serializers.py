# mlm/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Level, MLMUser
from .models import NFT

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = "__all__"

class MLMUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    active_a_referrals = serializers.SerializerMethodField()
    active_bc_referrals = serializers.SerializerMethodField()
    upline_chain = serializers.SerializerMethodField()
    needed_a = serializers.SerializerMethodField()
    needed_bc = serializers.SerializerMethodField()

    class Meta:
        model = MLMUser
        fields = [
            'username', 'email', 'first_name', 'last_name', 'referral_code', 'level',
            'active_a_referrals', 'active_bc_referrals',
            'upline_chain', 'needed_a', 'needed_bc',
        ]

    def get_active_a_referrals(self, obj):
        return MLMUser.objects.filter(upline=obj).count()

    def get_active_bc_referrals(self, obj):
        gradeA = MLMUser.objects.filter(upline=obj)
        gradeB = MLMUser.objects.filter(upline__in=gradeA)
        gradeC = MLMUser.objects.filter(upline__in=gradeB)
        return gradeB.count() + gradeC.count()

    def get_upline_chain(self, obj):
        chain = []
        current = obj.upline
        while current:
            chain.append(current.referral_code)
            current = current.upline
        return chain

    def get_needed_a(self, obj):
        next_level = obj.level + 1
        try:
            level = Level.objects.get(number=next_level)
            return level.needed_a
        except Level.DoesNotExist:
            return 0

    def get_needed_bc(self, obj):
        next_level = obj.level + 1
        try:
            level = Level.objects.get(number=next_level)
            return level.needed_bc
        except Level.DoesNotExist:
            return 0