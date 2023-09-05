from django.template.loader import render_to_string
from utils.email import send_email
from utils.format import build_front_url, format_date
from yoga.constants import BookingStatus
from yoga.models import Booking


def send_status_change_email(booking: Booking):
    user = booking.user
    if not user.preferences["notification__status_change"]:
        return

    context = (
        {
            "first_name": user.first_name,
            "session_date": format_date(booking.session.start_at),
            "url": build_front_url("/bookings"),
        },
    )
    if booking.status == BookingStatus.CONFIRMED:
        subject = ("Booking confirmed",)
        template = "booking_confirmed.html"
    elif booking.status == BookingStatus.CANCELED:
        subject = ("Booking canceled",)
        template = "booking_canceled.html"
        context["url"] = build_front_url("/sessions")
    else:
        return

    send_email(
        subject=subject,
        html_message=render_to_string(template, context),
        addresses=[user.email],
    )
