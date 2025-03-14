# Generated by Django 4.2.18 on 2025-02-17 10:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MLMUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referral_code', models.CharField(max_length=6, unique=True)),
                ('level', models.IntegerField(default=1)),
                ('upline', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mlm.mlmuser')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='NFT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price_usdt', models.DecimalField(decimal_places=2, max_digits=10)),
                ('image', models.ImageField(blank=True, null=True, upload_to='nfts/')),
                ('contract_address', models.CharField(blank=True, max_length=42, null=True, unique=True)),
                ('weekly_earning_rate', models.DecimalField(decimal_places=2, default=0, help_text='Percent profit per week, e.g., 2 means 2% per week.', max_digits=5)),
                ('status', models.CharField(choices=[('available', 'Available'), ('out_of_stock', 'Out of Stock')], default='available', help_text='Indicates if the NFT is currently available or out of stock.', max_length=20)),
                ('handling_fee_percentage', models.DecimalField(decimal_places=2, default=0, help_text='Extra percentage fee at purchase (e.g. 1.5%).', max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='NFTCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='NFTLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_hash', models.CharField(max_length=255)),
                ('date_purchased', models.DateTimeField(auto_now_add=True)),
                ('nft', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlm.nft')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlm.mlmuser')),
            ],
        ),
        migrations.AddField(
            model_name='nft',
            name='category',
            field=models.ForeignKey(blank=True, help_text='Select category from admin-managed list.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='mlm.nftcategory'),
        ),
        migrations.AddField(
            model_name='nft',
            name='level',
            field=models.ForeignKey(blank=True, help_text='Select level from admin-managed list.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='mlm.nftlevel'),
        ),
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commission_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date_earned', models.DateTimeField(auto_now_add=True)),
                ('purchase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlm.purchase')),
                ('upline_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlm.mlmuser')),
            ],
        ),
    ]
