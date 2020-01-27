# Generated by Django 2.0 on 2020-01-26 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('potions', '0007_auto_20200121_1029'),
    ]

    operations = [
        migrations.AddField(
            model_name='potion',
            name='currency',
            field=models.CharField(blank=True, choices=[('Galeón', 'Galeón'), ('Sickles', 'Sickles')], max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='potion',
            name='prize',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]