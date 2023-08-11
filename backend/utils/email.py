from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

SENDER_EMAIL = "martin.faucheux@gmail.com"


def send_email(subject: str, html_message: str, addresses: list[str]):
    return send_mail(
        subject,
        strip_tags(html_message),
        SENDER_EMAIL,
        addresses,
        html_message=html_message,
        fail_silently=False,
    )
