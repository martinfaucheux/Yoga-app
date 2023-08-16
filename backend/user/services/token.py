from datetime import timedelta

from django.utils import timezone
from rest_framework.exceptions import ValidationError
from user.models import Token, TokenTypes, User

TOKEN_EXPIRATION_DELAY = timedelta(hours=1)


def generate_token(user: User) -> Token:
    return Token.objects.create(
        user=user,
        type=TokenTypes.VERIFICATION,
        expire_at=timezone.now() + TOKEN_EXPIRATION_DELAY,
        is_used=False,
    )


def verified_authentication_rule(user: User):
    """
    Authentication rule for simple JWT package to check that the user is verified
    when logging in
    """
    if not user.is_active:
        return False

    if not user.is_verified:
        raise ValidationError({"details": ["The user is not verified"]})
    return True
