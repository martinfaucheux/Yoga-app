from django.utils import timezone
from rest_framework.exceptions import ValidationError
from user.constants import TOKEN_EXPIRATION_DELAY
from user.models import Token, TokenTypes, User


def generate_token(user: User, token_type: TokenTypes) -> Token:
    return Token.objects.create(
        user=user, type=token_type, expire_at=timezone.now() + TOKEN_EXPIRATION_DELAY
    )
