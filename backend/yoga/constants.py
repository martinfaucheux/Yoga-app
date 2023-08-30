from django.db import models


class BookingStatus(models.TextChoices):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELED = "canceled"
