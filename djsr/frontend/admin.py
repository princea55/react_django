from django.contrib import admin
import csv
from django.http import HttpResponse
from authentication.models import College, Professors, Students, CustomUser, Attendance, Contact

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'user_type')
    list_display_links = ('id', 'username')
    search_fields = ('username', 'user_type')
    list_filter = ('user_type',)
    list_per_page = 30

class CollegeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'college', 'city')
    # list_display_links = ('user')
    search_fields = ('college','city')
    list_per_page = 25

class ProfessorsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'college', 'department','role','is_approve')
    list_display_links = ('user',)
    search_fields = ('college','city','department')
    list_filter = ('is_approve','department')
    list_per_page = 25

class StudentsAdmin(admin.ModelAdmin):
    list_display = ('id','enrollment', 'user', 'college', 'department','semester','is_approve')
    list_display_links = ('id','user','enrollment')
    search_fields = ('college','enrollment')
    list_filter = ('is_approve','department','semester')
    list_per_page = 30
    actions = ["export_as_csv"]
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response
    export_as_csv.short_description = "Export Selected as CSV"

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('id','enrollment','created_date','sem')
    list_display_links = ('id','enrollment')
    search_fields = ('enrollment',)
    list_filter = ('created_date','sem')
    list_per_page = 50

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id','email')
    list_display_links = ('id','email')
    list_per_page = 50


admin.site.unregister(CustomUser)
admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(College,CollegeAdmin)
admin.site.register(Professors,ProfessorsAdmin)
admin.site.register(Students,StudentsAdmin)
admin.site.register(Attendance,AttendanceAdmin)
admin.site.register(Contact,ContactAdmin)

