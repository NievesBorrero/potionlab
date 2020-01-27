import os

from django.views.generic import TemplateView
from django.conf import settings


class IndexView(TemplateView):
    DEFAULT_RELEASE_VERSION = 'master'
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['environment'] = settings.DJANGO_ENVIRONMENT
        context['release_version'] = os.environ.get(
            'RELEASE_VERSION', self.DEFAULT_RELEASE_VERSION)
        return context
