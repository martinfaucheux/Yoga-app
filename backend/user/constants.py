from datetime import timedelta

from django.db import models

TOKEN_EXPIRATION_DELAY = timedelta(hours=1)
VERIFICATION_TOKEN_KEY = "token"
VERIFICATION_URL = "http://localhost:3000/verify?{key}={token}"


class TokenTypes(models.TextChoices):
    VERIFICATION = "verification"
