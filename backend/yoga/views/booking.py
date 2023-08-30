from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from user.permissions import IsVerified, isTeacher
from yoga.models import Booking
from yoga.serializers import BookingSerializer, BookingStatusSerializer
from yoga.services.booking import send_status_change_email


class BookingViewSet(
    CreateModelMixin, ListModelMixin, DestroyModelMixin, GenericViewSet
):
    serializer_class = BookingSerializer

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by(
            "session__start_at"
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated, IsVerified, isTeacher],
    )
    def update_status(self, request, pk):
        instance = self.get_object()
        serializer = BookingStatusSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        send_status_change_email(instance)
        return Response(serializer.data)
