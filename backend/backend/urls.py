from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from user.views import UserViewSet
from yoga.views import BookingViewSet, SessionViewSet


def trigger_error(request):
    division_by_zero = 1 / 0


router = routers.DefaultRouter()
router.register(r"sessions", SessionViewSet, "session")
router.register(r"bookings", BookingViewSet, "booking")
router.register(r"users", UserViewSet, "user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("sentry-debug/", trigger_error),
]
