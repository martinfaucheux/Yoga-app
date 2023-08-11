from rest_framework import serializers
from user.models import User
from user.services.user import create_user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "password")
        read_only_fields = ("id",)
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return create_user(**validated_data)

    def update(self, instance, validated_data):
        if password := validated_data.pop("password"):
            instance.set_password(password)
        return super().update(instance, validated_data)
