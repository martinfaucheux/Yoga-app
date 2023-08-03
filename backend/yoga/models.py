from django.db import models


class Session(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True, default="")
    picture_url = models.URLField(blank=True, null=True)
    yoga_type = models.CharField(max_length=120)
    duration = models.PositiveIntegerField()
    start_at = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def _str_(self):
        return self.name
