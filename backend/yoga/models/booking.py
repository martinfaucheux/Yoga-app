from django.db import models
from utils.models import BaseModel


class Booking(BaseModel):
    user = models.ForeignKey(
        "user.User", related_name="bookings", on_delete=models.CASCADE
    )
    session = models.ForeignKey(
        "yoga.Session", related_name="bookings", on_delete=models.CASCADE
    )
