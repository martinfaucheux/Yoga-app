from django.core.management.base import BaseCommand
from django.template.loader import render_to_string
from utils.email import send_email

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

        send_email("Verify your email", html_message, [to_email])

        self.stdout.write(self.style.SUCCESS("Email sent"))
