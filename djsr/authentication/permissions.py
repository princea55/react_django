from rest_framework.permissions import BasePermission

class IsCollege(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type=='College' 


class IsProfessor(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type=="Professor"

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type=="Student"

