from django.db import models
from utils.models import BaseModel


class Booking(BaseModel):
    user = models.ForeignKey(
        "user.User", related_name="bookings", on_delete=models.CASCADE
    )
    session = models.ForeignKey(
        "yoga.Session", related_name="bookings", on_delete=models.CASCADE
    )
    is_confirmed = models.BooleanField(default=False)

    class Meta:
        unique_together = [["user", "session"]]
