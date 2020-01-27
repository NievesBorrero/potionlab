from rest_framework.views import exception_handler
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response and response.status_code == 400:
        headers = {}

        if getattr(exc, 'auth_header', None):
            headers['WWW-Authenticate'] = exc.auth_header
        if getattr(exc, 'wait', None):
            headers['Retry-After'] = '%d' % exc.wait

        exception_response = Response(
            {'errors': response.data, 'status_code': response.status_code},
            status=response.status_code,
            headers=headers)
        return exception_response

    return response
