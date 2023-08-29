from django.db.models import OuterRef, Subquery
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from yoga.models import Booking, Session
from yoga.serializers import BookingSerializer, SessionSerializer


class BookingViewSet(
    CreateModelMixin, ListModelMixin, DestroyModelMixin, GenericViewSet
):
    serializer_class = BookingSerializer

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by(
            "session__start_at"
        )
