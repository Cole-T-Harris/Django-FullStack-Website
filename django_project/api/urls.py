from django.urls import path, include
from . import views

urlpatterns = [
    path("locations/",views.locations_response),
    path("products/",views.products_response)
]