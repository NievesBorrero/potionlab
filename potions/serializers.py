from rest_framework import serializers
from django.contrib.auth.models import User

from .models import (Potion, Ingredient, Chest)


class BaseModelSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)


class PotionSerializer(BaseModelSerializer):
    image = serializers.ImageField(read_only=True)
    image_thumb = serializers.ImageField(read_only=True)

    class Meta:
        model = Potion
        fields = ('id', 'name', 'effect', 'side_effects', 'ingredients', 'prize',
        'currency', 'image', 'image_thumb')
        depth = 1


class IngredientSerializer(BaseModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'description')


class ChestSerializer(BaseModelSerializer):
    class Meta:
        model = Chest
        fields = ('id', 'potions')


class UserSerializer(BaseModelSerializer):
    group = serializers.SerializerMethodField()
    chest = ChestSerializer(read_only=True)
    depth = 1

    class Meta:
        model = User
        fields = (
            'is_active', 'id', 'is_staff', 'email', 'username', 'first_name',
            'group', 'password', 'chest')
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {
            'is_active': {'default': False}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def get_group(self, obj):
        group = obj.groups.first()

        if not group:
            return None

        return group.name



