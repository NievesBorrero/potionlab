from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.contrib.auth import views as auth_views
from rest_framework import routers
from django.views.generic.base import RedirectView
from rest_framework_jwt.views import (
    refresh_jwt_token, obtain_jwt_token, verify_jwt_token)

from .views import IndexView
from potions.views import (
    UserViewSet, PotionViewSet, PotionImageUpload)

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'potions', PotionViewSet, base_name='Potions')

urlpatterns = [
    re_path(
        '^api/v1/potions/(?P<potion_id>\d+)/upload/',
        PotionImageUpload.as_view()),
    re_path('^api/v1/', include(router.urls)),
    re_path(
        '^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    re_path('^api-token-auth/', obtain_jwt_token),
    re_path('^api-token-refresh/', refresh_jwt_token),
    re_path('^api-token-verify/', verify_jwt_token),
    path('admin/', admin.site.urls),
    path('password_reset/', auth_views.password_reset, name='password_reset'),
    path('password_reset/done/', auth_views.password_reset_done,
         name='password_reset_done'),
    path('password_reset/<uidb64>/<token>/',
         auth_views.password_reset_confirm, name='password_reset_confirm'),
    path('password_reset/complete/', auth_views.password_reset_complete,
         name='password_reset_complete'),

    # Frontend urls
    re_path('^$', IndexView.as_view(), name='home_index'),
]

if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns \
      + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
      + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
