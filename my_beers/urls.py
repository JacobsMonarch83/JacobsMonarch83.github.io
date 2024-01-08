from django.urls import path
from . import views

urlpatterns = [
    path('', views.my_beers, name='my_beers'),
    path('check_in', views.check_in, name='check_in'),
    path('auth', views.auth, name='auth'),
]


