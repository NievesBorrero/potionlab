from django.db import models
from django.contrib.auth.models import User


class UserTrackable(models.Model):
    updated_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True)

    class Meta:
        abstract = True

    @property
    def updated_by_name(self):
        if not self.updated_by:
            return None
        return self.updated_by.username
