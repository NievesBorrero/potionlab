import uuid
import datetime

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from model_utils.models import TimeStampedModel, SoftDeletableModel
from model_utils import Choices

from .mixins import UserTrackable


def get_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '{environment}/images/{filename}'.format(
        environment=settings.DJANGO_ENVIRONMENT,
        filename=filename)


class Ingredient(TimeStampedModel, UserTrackable, SoftDeletableModel):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=400, null=True, blank=True)

    def __str__(self):
        return self.name


class Potion(TimeStampedModel, UserTrackable, SoftDeletableModel):
    CURRENCY_CHOICES = Choices('Galeón', 'Sickles')

    name = models.CharField(max_length=200)
    effect = models.CharField(max_length=200, null=True, blank=True)
    side_effects = models.CharField(max_length=200, null=True, blank=True)
    prize = models.IntegerField(null=True, blank=True)
    currency = models.CharField(
        choices=CURRENCY_CHOICES, max_length=30, null=True, blank=True)
    image = models.ImageField(upload_to=get_image_path, null=True, blank=True)
    image_thumb = ImageSpecField(
        source='image',
        processors=[ResizeToFill(199, 199)],
        format='JPEG',
        options={'quality': 60})
    ingredients = models.ManyToManyField(Ingredient, null=True, blank=True)


class Chest(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    potions = models.ManyToManyField(Potion, blank=True)
