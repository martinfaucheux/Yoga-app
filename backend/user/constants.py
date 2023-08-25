from datetime import timedelta

from django.db import models

TOKEN_EXPIRATION_DELAY = timedelta(hours=1)


class TokenTypes(models.TextChoices):
    VERIFICATION = "verification"
    RESET_PASSWORD = "reset_password"
