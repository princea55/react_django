from django.urls import path,re_path
from .views import index

urlpatterns = [
    path('', index,name='index'),  # for the empty url
    re_path(r'^.*/$', index)  # for all other urls

]