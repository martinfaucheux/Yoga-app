from rest_framework import viewsets

from .models import Session
from .serializers import SessionSerializer


class SessionView(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
