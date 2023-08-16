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
from user.serializers import TokenVerificationSerializer, UserSerializer


class UserViewSet(
    CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet
):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(
        detail=False, methods=["post"], serializer_class=TokenVerificationSerializer
    )
    def verify(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]

        try:
            token = Token.objects.select_related("user").get(
                token=token, type=TokenTypes.VERIFICATION, user__is_verified=False
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
