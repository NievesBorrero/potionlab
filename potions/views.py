from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import (
    SessionAuthentication, TokenAuthentication)
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
import json
import uuid
import datetime
import dateutil.parser
from functools import reduce
from operator import __or__ as OR

from .models import (Potion)
from .serializers import (PotionSerializer, UserSerializer)
from .validators import UserValidator, PotionValidator
from .services import (
    ErrorResponseService, FilesService, CheckFieldsService)


class BaseViewSet(viewsets.ModelViewSet):
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    validator_class = None

    def create(self, request):
        # TODO Use serializer.is_valid
        # TODO Provisional
        if not self.validator_class:
            is_valid = True
        else:
            is_valid = self.validator_class().validate(request.data)

        if not is_valid:
            raise exceptions.ValidationError(
                """The data is not valid, It needs
                the following values: {}""".format(
                    ', '.join(self.validator_class.REQUIRED_KEYS)
                )
            )

        return super().create(request)


class BaseUploadAPIView(APIView):
    parser_class = (FileUploadParser,)
    authentication_classes = (TokenAuthentication, )


class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    validator_class = UserValidator
    model_class = User
    FILTER_KEYS = ('username', 'email')

    def get_serializer_class(self):
        super().get_serializer_class()

        return self.serializer_class

    def get_permissions(self):
        if self.action in ('auth', 'create'):
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]

        return [permission() for permission in permission_classes]


    def retrieve(self, request, **kwargs):
        if int(kwargs.get('pk', 0)) != self.request.user.id:
            raise exceptions.AuthenticationFailed(
                'The user is not valid to access this profile')
        return super().retrieve(request, **kwargs)

    @action(methods=['post'], detail=False)
    def auth(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password'))

        if not user:
            return ErrorResponseService.get_error(401, 'The user or the password is not valid')

        serializer = self.serializer_class(user)
        data = serializer.data.copy()
        data['token'] = str(user.auth_token)

        return Response(data)


class PotionViewSet(BaseViewSet):
    FILTER_KEYS = ('name', 'surname', 'ethnic_group', 'passport', 'nie',
                   'gender', 'arrival_center_date', 'left_center_date', 'educator')
    serializer_class = PotionSerializer
    validator_class = PotionValidator
    model_class = Potion

    def get_queryset(self):
        if not self.request.GET:
            return Potion.objects.all()

        for param_key, param_value in self.request.GET.items():
            options = []
            if param_key == 'name':
                options.append((Q(name__icontains=param_value)))

        return Potion.objects.filter(reduce(OR, options))


class PotionImageUpload(BaseUploadAPIView):
    VALID_FIELDS = ('image', )

    def post(self, request, potion_id, format=None):
        data = request.data
        CheckFieldsService.is_valid_field(data, self.VALID_FIELDS)

        potion = get_object_or_404(Potion, pk=potion_id)

        if 'image' in data:
            file = data['image']
            FilesService.save_image(file)
            potion.image.save(file.name, file, save=True)
            serializer = PotionSerializer(potion)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {'image': 'File not found'}, status=status.HTTP_400_BAD_REQUEST)
