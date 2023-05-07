from django.urls import path, include
from . import views

urlpatterns = [
    path("locations/",views.locations_response)
]