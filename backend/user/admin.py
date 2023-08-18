from django.contrib import admin
from user.services.user import send_verification_email as _send_verification_email

from .models import Token, User


@admin.action(description="Send verification email")
def send_verification_email(modeladmin, request, queryset):
    for user in queryset:
        _send_verification_email(user)


class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name")
    search_fields = ["email", "first_name", "last_name"]
    actions = [send_verification_email]


class TokenAdmin(admin.ModelAdmin):
    list_display = ("user", "type", "token")
    search_fields = ["user__email", "user__first_name", "user__last_name", "token"]


admin.site.register(User, UserAdmin)
admin.site.register(Token, TokenAdmin)
