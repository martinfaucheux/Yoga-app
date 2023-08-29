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

    @action(detail=False, methods=["get"])
    def me(self, request):
        booking_qs = self.filter_queryset(
            Booking.objects.filter(user=self.request.user, session_id=OuterRef("id"))
        )
        session_qs = Session.objects.annotate(
            booking=Subquery(booking_qs.values("id")[:1]),
            # started_at__gte=timezone.now(),
        ).filter(booking__isnull=False)

        serializer = SessionSerializer(session_qs, many=True)
        return Response(serializer.data)
