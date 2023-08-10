from django.core import mail
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.template.loader import render_to_string
from django.utils.html import strip_tags

DEFAULT_EMAIL = "martin.faucheux@gmail.com"


class Command(BaseCommand):
    help = "Send a dummy email"

    def add_arguments(self, parser):
        parser.add_argument(
            "-e",
            "--email",
            type=str,
            help="Email address to send the test email",
            default=DEFAULT_EMAIL,
        )

    def handle(self, *args, **options):
        to_email = options["email"]
        html_message = render_to_string(
            "verify_email.html",
            {"first_name": "My dude", "verification_url": "https://localhost:3000"},
        )

        send_mail(
            "Verify your email",
            strip_tags(html_message),
            "from@example.com",
            [to_email],
            html_message=html_message,
            fail_silently=False,
        )

        self.stdout.write(self.style.SUCCESS("Email sent"))
