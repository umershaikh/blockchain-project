from django.contrib.auth.models import User
from django.db import models
import secrets
import string
from django.utils import timezone
from datetime import timedelta

class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    times_requested = models.PositiveSmallIntegerField(default=0)

    def is_expired(self):
        """Check if code is older than 5 minutes."""
        return timezone.now() > self.created_at + timedelta(minutes=5)

    def __str__(self):
        return f"{self.email} - Code: {self.code}"

class MLMUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    upline = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)
    referral_code = models.CharField(max_length=6, unique=True)  # 6-letter code
    level = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - Referral Code: {self.referral_code}"


class NFTCategory(models.Model):
    """
    Categories for NFTs (e.g., 'Art', 'Music', 'Gaming', etc.)
    Admin can add or remove these on the fly.
    """
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class NFTLevel(models.Model):
    """
    Levels for NFTs (e.g., 'Level 1', 'Level 2', etc.)
    Admin can add or remove these on the fly.
    """
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class NFT(models.Model):
    """
    A model to store NFT details:
      - name
      - price (in USDT)
      - image
      - contract address (auto-generated)
      - references to NFTCategory and NFTLevel (via ForeignKey)
      - weekly earning rate (e.g., 2.5%/week)
      - status (available/out_of_stock)
      - handling fee % (extra charge at purchase)
    """

    STATUS_CHOICES = (
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
    )

    name = models.CharField(max_length=255)
    price_usdt = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='nfts/', blank=True, null=True)
    contract_address = models.CharField(max_length=42, unique=True, blank=True, null=True)

    category = models.ForeignKey(
        NFTCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Select category from admin-managed list."
    )
    level = models.ForeignKey(
        NFTLevel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Select level from admin-managed list."
    )

    weekly_earning_rate = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0,
        help_text="Percent profit per week, e.g., 2 means 2% per week."
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='available',
        help_text="Indicates if the NFT is currently available or out of stock."
    )
    handling_fee_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        help_text="Extra percentage fee at purchase (e.g. 1.5%)."
    )

    def save(self, *args, **kwargs):
        if not self.contract_address:
            self.contract_address = self._generate_contract_address()
        super(NFT, self).save(*args, **kwargs)

    def _generate_contract_address(self) -> str:
        """
        Generate a random '0x' + 40-char hex string.
        This is purely for display/demo; not a real blockchain address.
        """
        return "0x" + secrets.token_hex(20)

    def __str__(self):
        cat_name = self.category.name if self.category else "No Category"
        lvl_name = self.level.name if self.level else "No Level"
        return f"{self.name} - ({cat_name} / {lvl_name})"


class Purchase(models.Model):
    user = models.ForeignKey(MLMUser, on_delete=models.CASCADE)
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE)
    transaction_hash = models.CharField(max_length=255)
    date_purchased = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Purchase #{self.id} by {self.user.user.username} - {self.nft.name}"


class Commission(models.Model):
    upline_user = models.ForeignKey(MLMUser, on_delete=models.CASCADE)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    commission_amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_earned = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commission #{self.id} for upline {self.upline_user.user.username}"
