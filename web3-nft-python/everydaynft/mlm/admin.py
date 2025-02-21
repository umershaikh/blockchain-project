from django.contrib import admin
from .models import MLMUser, NFT, Purchase, Commission, NFTCategory, NFTLevel

@admin.register(MLMUser)
class MLMUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'referral_code', 'level', 'upline')

@admin.register(NFTCategory)
class NFTCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(NFTLevel)
class NFTLevelAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(NFT)
class NFTAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'price_usdt', 'status')
    list_filter = ('status', 'category', 'level')
    search_fields = ('name', 'contract_address')

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'nft', 'transaction_hash', 'date_purchased')
    list_filter = ('date_purchased',)

@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'upline_user', 'purchase', 'commission_amount', 'date_earned')
    list_filter = ('date_earned',)
