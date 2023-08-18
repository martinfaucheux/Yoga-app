from django.db import transaction
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from user.constants import TokenTypes
from user.models import Token, User
from user.serializers import (
    RequestResetPaswordSerializer,
    ResetPasswordSerializer,
    TokenSerializer,
    UserSerializer,
)
from user.services.user import send_reset_password_email
from utils import log


class UserViewSet(
    CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet
):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=["post"], serializer_class=TokenSerializer)
    def verify(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        try:
            token = Token.objects.select_related("user").get(
                token=token,
                type=TokenTypes.VERIFICATION,
                used_at__isnull=True,
                user__is_verified=False,
            )
        except Token.DoesNotExist:
            raise PermissionError({"token": ["Invalid token"]})

        with transaction.atomic():
            token.used_at = timezone.now()
            token.save(update_fields=["used_at"])

            user = token.user
            user.is_verified = True
            user.save()

        return Response({"status": "ok"})

    @action(
        detail=False, methods=["post"], serializer_class=RequestResetPaswordSerializer
    )
    def request_reset_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist():
            log(f"Unknown user: {email}")
        else:
            send_reset_password_email(user)

        return Response({"status": "ok"})

    @action(detail=False, methods=["post"], serializer_class=ResetPasswordSerializer)
    def reset_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        try:
            token = Token.objects.select_related("user").get(
                token=token,
                type=TokenTypes.RESET_PASSWORD,
                used_at__isnull=True,
            )
        except Token.DoesNotExist:
            raise PermissionError({"token": ["Invalid token"]})

        user = token.user
        if not user.is_verified:
            raise PermissionError({"user": ["User is not verified"]})

        with transaction.atomic():
            token.used_at = timezone.now()
            token.save(update_fields=["used_at"])

            user.set_password(serializer.validated_data["password"])
            user.save()

        return Response({"status": "ok"})
