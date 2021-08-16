from django.urls import path
from library import views
from django.conf.urls import include

app_name = 'library'
urlpatterns = [
    path('', views.upload_file, name='upload'),
    path('', views.library, name = 'library'),
    path('collectHighlight/', views.collectHighlight, name = 'collectHighlight'),
    path('editor/', views.editor, name = 'editor'),
    path('viewer/<int:id>', views.viewer, name = 'viewer'),
]