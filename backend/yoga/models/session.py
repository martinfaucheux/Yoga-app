from django.db import models
from utils.models import BaseModel


class Session(BaseModel):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")
    picture_url = models.URLField(blank=True, null=True)
    yoga_type = models.CharField(max_length=120)
    duration = models.PositiveIntegerField()
    start_at = models.DateTimeField()

    def _str_(self):
        return self.name
