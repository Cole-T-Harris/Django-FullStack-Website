from django.urls import path
from . import views

urlpatterns = [
    path("", views.main_page),
    path("grocery_app/", views.grocery_app)
]