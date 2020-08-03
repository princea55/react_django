from rest_framework import filters

class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', ['user__username','college','=semester','=enrollment','department'])