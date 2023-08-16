from rest_framework import serializers


class TokenVerificationSerializer(serializers.Serializer):
    token = serializers.UUIDField()
