from django.urls import path
from library import views
from django.conf.urls import include

app_name = 'library'
urlpatterns = [
    path('', views.upload_file, name='upload'),
]