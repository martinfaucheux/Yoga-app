from django.utils import timezone
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from user.permissions import IsVerified, isTeacher
from yoga.constants import BookingStatus
from yoga.models import Booking
from yoga.serializers import BookingSerializer, BookingStatusSerializer
from yoga.services.booking import send_status_change_email


class BookingFilter(filters.FilterSet):
    upcoming = filters.BooleanFilter(method="filter_upcoming")
    status = filters.ChoiceFilter(choices=BookingStatus.choices)

    def filter_upcoming(self, queryset, name, value):
        if bool(value):
            return queryset.filter(session__start_at__gte=timezone.now())
        return queryset

    class Meta:
        model = Booking
        fields = ["upcoming"]


class BookingViewSet(
    CreateModelMixin, ListModelMixin, DestroyModelMixin, GenericViewSet
):
    serializer_class = BookingSerializer
    filterset_class = BookingFilter
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        queryset = Booking.objects.order_by("session__start_at")
        if self.action not in ["all", "update_status"]:
            queryset = queryset.filter(user=self.request.user)
        return queryset

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

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated, IsVerified, isTeacher],
    )
    def all(self, *args, **kwargs):
        return self.list(*args, **kwargs)
