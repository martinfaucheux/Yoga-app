from django.contrib import admin
from yoga.models import Session


class SessionAdmin(admin.ModelAdmin):
    list_display = ("name", "yoga_type", "start_at")


admin.site.register(Session, SessionAdmin)
