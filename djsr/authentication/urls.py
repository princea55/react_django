from django.urls import path
from rest_framework_simplejwt import views as jwt_views
# from .views import ObtainTokenPairWithColorView, CustomUserCreate
from .views import *

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', CurrentView.as_view(), name='current'),
    path('user/update/<int:pk>', CustomUserUpdate.as_view(), name='update'),
    path('user/delete/<int:pk>', DestroyCustomUser.as_view(), name='delete'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('customuserlist/', ListCustomUser.as_view()),

    path('college/', CreateCollege.as_view()),
    # path('college/detail/<int:pk>/', DetailCollege.as_view()),
    path('college/update/<int:pk>/', UpdateCollege.as_view()),
    path('college/delete/<int:pk>/', DestroyCollege.as_view()),
    path('college/list/',ListCollege.as_view()),

    # Professors
    path('professor/', CreateProfessor.as_view()),
    path('professor/detail/<int:pk>/', DetailProfessor.as_view()),
    path('professor/update/<int:pk>/', UpdateProfessor.as_view()),
    path('professor/delete/<int:pk>/', DestroyProfessor.as_view()),
    path('professorlist/', ListProfessors.as_view()),
    # Students
    path('students/', CreateStudent.as_view()),
    path('student/detail/<int:pk>/', DetailStudent.as_view()),
    path('student/update/<int:pk>/',UpdateStudent.as_view()),
    path('student/delete/<int:pk>/', DestroyStudent.as_view()),
    path('studentlist/',ListStudents.as_view()),
    # Attendance
    path('attendancelist/',ListAttendance.as_view()),
    #MakeContact
    path('contactus/', MakeContact.as_view()),
]
