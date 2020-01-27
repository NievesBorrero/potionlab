from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from django.contrib.auth.models import User

from .models import (Potion, Ingredient, Chest)


class UserInline(admin.TabularInline):
    model = User
    extra = 1


class IngredientAdmin(admin.ModelAdmin):
    model = Ingredient
    list_display = (
        'id', 'name', 'description')
    list_filter = ('name', )


class PotionAdmin(admin.ModelAdmin):
    model = Potion
    list_display = (
        'id', 'name', 'effect', 'side_effects')
    list_filter = ('name', )


class ChestAdmin(admin.ModelAdmin):
    model = Chest
    list_display = ('id', 'user')


admin.site.register(Potion, PotionAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Chest, ChestAdmin)
