from rest_framework import serializers
from yoga.models import Session


class SessionSerializer(serializers.ModelSerializer):
    booking = serializers.IntegerField()

    class Meta:
        model = Session
        fields = [
            "id",
            "name",
            "description",
            "picture_url",
            "yoga_type",
            "duration",
            "start_at",
            "booking",
        ]
