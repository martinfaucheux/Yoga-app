from django.template.loader import render_to_string
from user.constants import TokenTypes
from user.models import User
from user.services.token import generate_token
from utils.email import send_email
from utils.format import build_front_url


def create_user(email, **extra_fields):
    user = User.objects.create_user(email, **extra_fields)
    send_verification_email(user)
    return user


def send_verification_email(user):
    if user.is_verified:
        return

    token = generate_token(user, TokenTypes.VERIFICATION)
    send_email(
        subject="Verify your emails",
        html_message=render_to_string(
            "verify_email.html",
            {
                "first_name": user.first_name,
                "verification_url": build_front_url("/verify", {"token": token.token}),
            },
        ),
        addresses=[user.email],
    )
    return user


def send_reset_password_email(user):
    token = generate_token(user, TokenTypes.RESET_PASSWORD)
    send_email(
        subject="Reset your password",
        html_message=render_to_string(
            "reset_password.html",
            {
                "first_name": user.first_name,
                "reset_password_url": build_front_url(
                    "/reset-password", {"token": token.token}
                ),
            },
        ),
        addresses=[user.email],
    )
