from django.conf import settings
from django.http import JsonResponse


class CheckValidDomainForApi:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view, args, kwargs):
        if settings.DEBUG or settings.DJANGO_ENVIRONMENT is 'test':
            return None

        if not self.is_valid_host(request.META):
            return JsonResponse(
                {'error': 'This domain cannot access the api'}, status=403)

        return None

    @classmethod
    def is_valid_host(cls, request_meta):
        return request_meta.get('HTTP_HOST', '').split(':')[0] \
               in settings.ALLOWED_HOSTS
