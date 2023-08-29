from django.db.models import OuterRef, Subquery
from rest_framework import viewsets
from yoga.models import Booking, Session
from yoga.serializers import SessionSerializer


class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
