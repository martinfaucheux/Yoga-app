from django.contrib import admin

from .models import Token, User


class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "last_name")


class TokenAdmin(admin.ModelAdmin):
    list_display = ("user", "type", "expire_at")


admin.site.register(User, UserAdmin)
admin.site.register(Token, TokenAdmin)
