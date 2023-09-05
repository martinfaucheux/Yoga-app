from dynamic_preferences.preferences import Section
from dynamic_preferences.registries import global_preferences_registry
from dynamic_preferences.types import BooleanPreference, StringPreference
from dynamic_preferences.users.registries import user_preferences_registry

notification_section = Section("notification")


@user_preferences_registry.register
class CommentNotificationsEnabled(BooleanPreference):
    """Do you want to be notified by your booking status change?"""

    section = notification_section
    name = "status_change"
    default = False
