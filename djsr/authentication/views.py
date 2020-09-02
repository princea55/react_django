from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer,Attendanceserializer,CustomUserSerializer,Collegeserializer,Studentserializer,Professorserializer, Contactserializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsProfessor,IsCollege,IsStudent
from rest_framework import generics,filters
from .models import CustomUser,Students,Professors,College,Attendance, Contact
from rest_framework import filters
from authentication.search import DynamicSearchFilter

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    authentication_classes = ()
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CurrentView(APIView):
    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(data={"hello":serializer.data},status=status.HTTP_200_OK)
    #
    # def get(self, request):
    #
    #     return Response(data={"hello":}, status=status.HTTP_200_OK)
class CustomUserUpdate(generics.
RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny,]
    lookup_field = 'pk'

class DestroyCustomUser(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny,]

class ListCustomUser(generics.ListAPIView):
    search_fields = ['college']
    filter_backends = (filters.SearchFilter,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny,]


 #------------------------------------College
class CreateCollege(generics.CreateAPIView):
    queryset = Students.objects.all()
    serializer_class = Collegeserializer
    permission_classes = [IsCollege,]

class DetailCollege(generics.RetrieveAPIView):
    queryset = College.objects.all()
    serializer_class = Collegeserializer
    permission_classes = [IsCollege]

class UpdateCollege(generics.RetrieveUpdateAPIView):
    queryset = College.objects.all()
    serializer_class = Collegeserializer
    permission_classes = [permissions.AllowAny,]
    lookup_field = 'pk'

class DestroyCollege(generics.DestroyAPIView):
    queryset = College.objects.all()
    serializer_class = Collegeserializer
    permission_classes = [IsProfessor,IsCollege ]

class ListCollege(generics.ListAPIView):
    search_fields = ['=user__username','=phone']
    filter_backends = (filters.SearchFilter,)
    queryset = College.objects.all()
    serializer_class = Collegeserializer
    permission_classes = [permissions.AllowAny,]



# Professors
class CreateProfessor(generics.CreateAPIView):
    queryset = Professors.objects.all()
    serializer_class = Professorserializer
    permission_classes = [IsProfessor]

class DetailProfessor(generics.RetrieveAPIView):
    queryset = Professors.objects.all()
    serializer_class = Professorserializer
    permission_classes = [IsProfessor]

class UpdateProfessor(generics.UpdateAPIView):
    queryset = Professors.objects.all()
    serializer_class = Professorserializer
    permission_classes = [IsProfessor|IsCollege]

class DestroyProfessor(generics.DestroyAPIView):
    queryset = Professors.objects.all()
    serializer_class = Professorserializer
    permission_classes = [IsCollege|IsProfessor]

class ListProfessors(generics.ListAPIView):
    search_fields = ['department', 'role','user__username','college','is_approve']
    filter_backends = (filters.SearchFilter,)
    queryset = Professors.objects.all()
    serializer_class = Professorserializer
    permission_classes = [permissions.AllowAny,]


#-----------------------------------------------------------------

#------------Student--------------------------
class CreateStudent(generics.CreateAPIView):
    queryset = Students.objects.all()
    serializer_class = Studentserializer
    permission_classes = [IsStudent]

class DetailStudent(generics.RetrieveAPIView):
    queryset = Students.objects.all()
    serializer_class = Studentserializer
    permission_classes = [IsStudent|IsCollege|IsProfessor]

class UpdateStudent(generics.UpdateAPIView):
    queryset = Students.objects.all()
    serializer_class = Studentserializer
    permission_classes = [permissions.AllowAny,]

class DestroyStudent(generics.DestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = Studentserializer
    permission_classes = [IsCollege|IsProfessor]

class ListStudents(generics.ListAPIView):
    search_fields = ['user__username', '=semester', '=enrollment', 'department','college','is_approve']
    filter_backends = (filters.SearchFilter,)
    queryset = Students.objects.all()
    serializer_class = Studentserializer
    permission_classes = [permissions.AllowAny,]


# Attendanceserializer View

class ListAttendance(generics.ListCreateAPIView):
    search_fields = ['=enrollment']
    filter_backends = (filters.SearchFilter,)
    queryset = Attendance.objects.all().order_by('created_date')
    serializer_class = Attendanceserializer
    permission_classes = [permissions.AllowAny,]


class DetailAttendance(generics.RetrieveUpdateDestroyAPIView):
    search_fields = ['=enrollment']
    filter_backends = (filters.SearchFilter,)
    queryset = Attendance.objects.all().order_by('-created_date')
    serializer_class = Attendanceserializer
    permission_classes = [permissions.AllowAny,]

class MakeContact(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = Contactserializer
    permission_classes = [permissions.AllowAny,]
