from django.contrib import admin
from yoga.models import Booking, Session


class SessionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "yoga_type", "start_at")


class BoookingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "session")


admin.site.register(Session, SessionAdmin)
admin.site.register(Booking, BoookingAdmin)
