from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from grimoire.middleware import CheckValidDomainForApi


class CheckValidDomainForApiTestCase(TestCase):
    def test_is_not_valid(self):
        meta = {'HTTP_HOST': 'invalid'}

        is_valid = CheckValidDomainForApi.is_valid_host(meta)

        self.assertFalse(is_valid)

    def test_is_valid_local(self):
        meta = {'HTTP_HOST': 'localhost:8000'}

        is_valid = CheckValidDomainForApi.is_valid_host(meta)

        self.assertTrue(is_valid)
