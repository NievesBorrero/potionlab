import os
import json
from PIL import Image
from django.conf import settings
import requests
from django.http import JsonResponse
from rest_framework import exceptions
from django.core.files.storage import FileSystemStorage
from django.template.loader import render_to_string
from django.contrib.sites.models import Site


def get_base_url():
    site = Site.objects.first()
    scheme = 'https://'

    if 'localhost' in site.domain:
        scheme = 'http://'
    return '{}{}'.format(scheme, site.domain)


class ErrorResponseService:
    STATUS_CODES = {
        400: 'BAD REQUEST'
    }

    @staticmethod
    def get_error(status, message):
        return JsonResponse({
            'status': ErrorResponseService.STATUS_CODES.get(
                status), 'message': message}, status=status)


class FilesService:

    @staticmethod
    def save_file(file):
        fs = FileSystemStorage()
        fs.save(file.name, file)
        return fs.url(file.name)

    @staticmethod
    def delete_file(file_name):
        fs = FileSystemStorage()
        fs.delete(file_name)
        return not fs.exists(file_name)

    @staticmethod
    def save_image(image):
        try:
            img = Image.open(image)
            img.verify()
        except:
            raise exceptions.ParseError(
                "Unsupported image type: valid file types {}")


class CheckFieldsService:

    @staticmethod
    def is_valid_field(data, valid_fields):
        if next(iter(data)) not in valid_fields:
            raise exceptions.ParseError("Empty content")
