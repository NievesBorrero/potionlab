from django.apps import AppConfig


class PotionsConfig(AppConfig):
    name = 'potions'

    def ready(self):
        import potions.signals
