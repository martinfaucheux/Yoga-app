from django.db import models
from utils.models import BaseModel
from yoga.constants import BookingStatus


class Booking(BaseModel):
    user = models.ForeignKey(
        "user.User", related_name="bookings", on_delete=models.CASCADE
    )
    session = models.ForeignKey(
        "yoga.Session", related_name="bookings", on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=20,
        choices=BookingStatus.choices,
        help_text="Status of the booking",
        default=BookingStatus.PENDING,
    )

    class Meta:
        unique_together = [["user", "session"]]
