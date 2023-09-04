from django.utils import timezone
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from yoga.constants import BookingStatus
from yoga.models import Session
from yoga.serializers import SessionSerializer


class SessionFiltere(filters.FilterSet):
    upcoming = filters.BooleanFilter(method="filter_upcoming")

    def filter_upcoming(self, queryset, name, value):
        if bool(value):
            return queryset.filter(start_at__gte=timezone.now())
        return queryset

    class Meta:
        model = Session
        fields = ["upcoming"]


class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()
