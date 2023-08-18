from datetime import timedelta

from django.db import models

TOKEN_EXPIRATION_DELAY = timedelta(hours=1)
URL_TOKEN_KEY = "token"
VERIFICATION_URL = "http://localhost:3000/verify?{key}={token}"
RESET_PASSWORD_URL = "http://localhost:3000/reset-password?{key}={token}"


class TokenTypes(models.TextChoices):
    VERIFICATION = "verification"
    RESET_PASSWORD = "reset_password"
