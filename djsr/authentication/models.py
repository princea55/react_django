from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from datetime import datetime, date
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


user_type_data = (("Student", "Student"), ('College',
                                           "College"), ('Professor', "Professor"), )


class CustomUser(AbstractUser):
    user_type = models.CharField(max_length=100, choices=user_type_data)
    
        
    REQUIRED_FIELDS = ['is_active']

    def __str__(self):
        return self.username


class College(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='student')
    phone = models.CharField(blank=False, unique=True, max_length=12)
    college = models.CharField(max_length=300)
    city = models.CharField(max_length=100, blank=False)
    objects = models.Manager()

    def __str__(self):
        return self.college
    class Meta:
        verbose_name_plural = "College"


class Professors(models.Model):
    Professors_ROLE = (
        ("HOD", "HOD"),
        ("Professor", "Professor"),
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='professors')
    college = models.CharField(max_length=300)
    department = models.CharField(max_length=100, blank=False)
    role = models.CharField(
        max_length=20, choices=Professors_ROLE, default='Professor')
    is_approve = models.BooleanField(default=False)
    objects = models.Manager()

    def __str__(self):
        return self.user.username
    class Meta:
        verbose_name_plural = "Professors"


class Students(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='students')
    college = models.CharField(max_length=300, blank=False)
    enrollment = models.CharField(max_length=50, blank=False, unique=True)
    semester = models.CharField(max_length=5, blank=False)
    department = models.CharField(max_length=50, blank=False)
    is_approve = models.BooleanField(default=False)
    total_attendance = models.IntegerField(default=0)
    objects = models.Manager()

    def __str__(self):
        return self.user.username
    class Meta:
        verbose_name_plural = "Students"
    


class Attendance(models.Model):
    enrollment = models.CharField(max_length=50, blank=False)
    created_date = models.DateField(default=date.today)
    sem = models.IntegerField()


    def __str__(self):
        return self.enrollment
    
    class Meta:
        verbose_name_plural = "Attendance"

class Contact(models.Model):
    email = models.CharField(max_length=50, blank=False, null=False)
    message = models.TextField(blank=False, null=False)

    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name_plural = "Contact"