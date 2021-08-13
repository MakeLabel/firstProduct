from django.urls import path
from library import views

app_name="library"

urlpatterns = [
    path('', views.library, name = 'library'),
    path('collectHighlight/', views.collectHighlight, name = 'collectHighlight'),
    path('editor/', views.editor, name = 'editor'),
    path('viewer/', views.viewer, name = 'viewer'),
]