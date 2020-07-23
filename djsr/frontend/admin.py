from django.contrib import admin

from authentication.models import College, Professors, Students, CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'user_type')
    list_display_links = ('id', 'username')
    search_fields = ('username', 'user_type')
    list_per_page = 25

class CollegeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'college', 'city')
    # list_display_links = ('user')
    search_fields = ('college','city')
    list_per_page = 25

class ProfessorsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'college', 'department','role')
    list_display_links = ('user',)
    search_fields = ('college','city','department')
    list_per_page = 25

class StudentsAdmin(admin.ModelAdmin):
    list_display = ('id','enrollment', 'user', 'college', 'department','semester')
    list_display_links = ('id','user','enrollment')
    search_fields = ('college','enrollment','department')
    list_per_page = 25

admin.site.unregister(CustomUser)
admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(College,CollegeAdmin)
admin.site.register(Professors,ProfessorsAdmin)
admin.site.register(Students,StudentsAdmin)

