from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework_jwt.settings import api_settings
from potions.models import Potion


class BaseTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user1 = User.objects.create_user(
            username='testuser1', password='12345')
        self.user1.save()
        self.user2 = User.objects.create_user(
            username='testuser2', password='12345')
        self.user2.save()
        Potion.objects.create(name="parrot")

    def create_jwt_for_user(self, user):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def create_user(self, username, password):
        user = get_user_model().objects.create_user(
            username, '{}@gmail.com'.format(username))
        user.set_password(password)
        user.save()

        return user
