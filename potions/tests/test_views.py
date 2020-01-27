import datetime
import json
import uuid
import datetime
from unittest.mock import patch
from model_mommy import mommy

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from grimoire.base import BaseTestCase


class IndexViewTestCase(BaseTestCase):
    def test_index_view_not_authenticated(self):
        resp = self.client.get(reverse('home_index'))

        self.assertEqual(resp.status_code, 200)

    def test_index_view_authenticated(self):
        self.client.login(username='testuser1', password='12345')

        resp = self.client.get(reverse('home_index'))

        self.assertEqual(resp.status_code, 200)


class UserViewTestCase(BaseTestCase):
    call_id = str(uuid.uuid4())
    BASE_URL = '/api/v1/users/'

    def test_create_not_authenticated_no_data(self):
        resp = self.client.post(self.BASE_URL)

        self.assertEqual(resp.status_code, 400)

    def test_create_not_authenticated_with_data(self):
        resp = self.client.post(
            self.BASE_URL,
            json.dumps(
                {
                    'username': 'harry',
                    'email': 'harry@gryffindor.com',
                    'password': 'gryffindor'
                }
            ),
            content_type='application/json'
        )

        self.assertEqual(resp.status_code, 201)

    def test_create_not_authenticated_with_data_check_password(self):

        resp = self.client.post(
            self.BASE_URL,
            json.dumps(
                {
                    'username': 'harry',
                    'email': 'harry@gryffindor.com',
                    'password': 'gryffindor'
                }
            ),
            content_type='application/json'
        )
        user = User.objects.get(pk=json.loads(resp.content)['id'])

        self.assertEqual(resp.status_code, 201)
        self.assertTrue(user.password)

    def test_create_not_authenticated_with_data_check_is_active_false(self):
        resp = self.client.post(
            self.BASE_URL,
            json.dumps(
                {
                    'username': 'harry',
                    'email': 'harry@gryffindor.com',
                    'password': 'gryffindor'
                }
            ),
            content_type='application/json'
        )

        self.assertEqual(resp.status_code, 201)
        self.assertEqual(json.loads(resp.content)['is_active'], False)

    def test_post_authenticated_no_data(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.post(
            self.BASE_URL,
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 400)

    def test_post_authenticated_with_data_invalid(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.post(
            self.BASE_URL,
            json.dumps({'name': 'test'}),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 400)

    def test_post_authenticated_with_data_valid(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.post(
            self.BASE_URL,
            json.dumps(
                {
                    'username': 'harry',
                    'email': 'harry@gryffindor.com',
                    'password': 'gryffindor'
                }
            ),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 201)

    def test_retrieve_user_anonymous_permission_denied(self):
        resp = self.client.get(
            '{}{}/'.format(self.BASE_URL, str(self.user1.id)),
            content_type='application/json')

        self.assertEqual(resp.status_code, 401)

    def test_retrieve_other_user_authenticated_permission_denied(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.get(
            '{}{}/'.format(self.BASE_URL, str(self.user2.id)),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 401)

    def test_retrieve_valid_user_authenticated_ok(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.get(
            '{}{}/'.format(self.BASE_URL, str(self.user1.id)),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 200)


class PotionApiTestCase(BaseTestCase):
    BASE_URL = '/api/v1/potions/'

    def test_create_not_authenticated(self):
        resp = self.client.post(self.BASE_URL)

        self.assertEqual(resp.status_code, 401)

    def test_create_authenticated(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.post(
            self.BASE_URL,
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )

        self.assertEqual(resp.status_code, 400)

    def test_create_authenticated_valid_data_check_updated_by(self):
        token = self.create_jwt_for_user(self.user1)

        resp = self.client.post(
            self.BASE_URL,
            json.dumps(
                {
                    'name': 'Felix Felicis',
                }
            ),
            content_type='application/json',
            HTTP_AUTHORIZATION='JWT {}'.format(token)
        )
