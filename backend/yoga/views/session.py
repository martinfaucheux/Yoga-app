from django.db.models import OuterRef, Subquery
from rest_framework import viewsets
from yoga.models import Booking, Session
from yoga.serializers import SessionSerializer


class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer

    def get_queryset(self):
        booking_query = Booking.objects.filter(
            user=self.request.user, session_id=OuterRef("id")
        )
        return Session.objects.annotate(
            booking=Subquery(booking_query.values("id")[:1])
        )
