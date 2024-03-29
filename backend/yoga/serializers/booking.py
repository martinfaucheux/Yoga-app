from rest_framework import serializers
from yoga.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "session", "user", "status"]
        read_only_fields = fields

    def validate(self, attrs):
        attrs["user"] = self.context["request"].user
        return super().validate(attrs)


class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["status"]
        read_only_fields = []
