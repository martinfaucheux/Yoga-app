from uuid import uuid4

from django.db import models
from user.constants import TokenTypes
from utils.models import BaseModel


class Token(BaseModel):
    token = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(
        "user.User",
        related_name="tokens",
        on_delete=models.CASCADE,
        help_text="A token can be scoped for and user",
    )
    type = models.CharField(
        max_length=20, choices=TokenTypes.choices, help_text="The type of the token"
    )
    expire_at = models.DateTimeField(
        null=True, help_text="The expiration date of the token"
    )
    used_at = models.DateTimeField(
        null=True, help_text="The expiration date of the token"
    )

    def is_used(self) -> bool:
        return self.used_at is not None
