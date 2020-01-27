from grimoire.settings import *

DJANGO_ENVIRONMENT = 'test'

database_url = os.environ.get('DATABASE_URL', None)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'grimoire_test',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'postgres',
        'PORT': '5432'
    }
}

if database_url:
    DATABASES['default'] = dj_database_url.parse(
        database_url, conn_max_age=600)

DEBUG = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'root': {
        'level': os.environ.get('DJANGO_DEBUG_LEVEL', default='INFO'),
        'handlers': []
    },
    'formatters': {
        'default': {
            'format': '[%(asctime)s: %(levelname)s] %(name)s@%(funcName)s:%(lineno)s %(message)s', #noqa
        },
    },
    'handlers': {
        'console': {
            'level': os.environ.get('DJANGO_DEBUG_LEVEL', default='INFO'),
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        '': {
            'level': 'INFO',
            'handlers': ['console']
        }
    },
}

ALLOWED_HOSTS = ['localhost']
