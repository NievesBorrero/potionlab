# Generated by Django 2.0 on 2020-01-21 09:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('potions', '0003_auto_20200121_0956'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='potion',
            name='created',
        ),
        migrations.RemoveField(
            model_name='potion',
            name='is_removed',
        ),
        migrations.RemoveField(
            model_name='potion',
            name='modified',
        ),
        migrations.RemoveField(
            model_name='potion',
            name='updated_by',
        ),
    ]