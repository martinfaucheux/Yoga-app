from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Session
from .serializers import SessionSerializer


class SessionView(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
