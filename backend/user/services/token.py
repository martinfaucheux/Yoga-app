from datetime import timedelta

from django.utils import timezone
from user.models import Token, TokenTypes, User

TOKEN_EXPIRATION_DELAY = timedelta(hours=1)


def generate_token(user: User) -> Token:
    return Token.objects.create(
        user=user,
        type=TokenTypes.VERIFICATION,
        expire_at=timezone.now() + TOKEN_EXPIRATION_DELAY,
        is_used=False,
    )
