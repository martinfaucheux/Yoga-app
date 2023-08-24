from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags


def send_email(subject: str, html_message: str, addresses: list[str]):
    return send_mail(
        subject,
        strip_tags(html_message),
        settings.EMAIL_HOST_USER,
        addresses,
        html_message=html_message,
        fail_silently=False,
    )
