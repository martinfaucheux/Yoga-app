from django.template.loader import render_to_string
from user.constants import VERIFICATION_TOKEN_KEY, VERIFICATION_URL
from user.models import User
from user.services.token import generate_token
from utils.email import send_email


def create_user(email, **extra_fields):
    user = User.objects.create_user(email, **extra_fields)
    token = generate_token(user)
    send_email(
        subject="Verify your emails",
        html_message=render_to_string(
            "verify_email.html",
            {
                "first_name": user.first_name,
                "verification_url": VERIFICATION_URL.format(
                    key=VERIFICATION_TOKEN_KEY, token=token.token
                ),
            },
        ),
        addresses=[user.email],
    )
    return user
