from django.views.generic.base import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request


class IsVerified(IsAuthenticated):
    """
    Allow authenticated users with a verified email
    """

    message = "please confirm your email address"

    def has_permission(self, request: Request, view: View) -> bool:
        return request.user.is_verified


class isTeacher(IsAuthenticated):
    """
    Allow only teacher users
    """

    message = "this action is reserved for teacher users"

    def has_permission(self, request: Request, view: View) -> bool:
        return request.user.is_teacher
