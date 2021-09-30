from django.urls import path
from library import views
from django.conf.urls import include
# from django.conf.urls import url
# from django.views.generic import RedirectView


app_name = 'library'

urlpatterns = [
    path('', views.upload_file, name='upload'),
    path('', views.library, name = 'library'),
    path('collectHighlight/', views.collectHighlight, name = 'collectHighlight'),
    path('editor/', views.editor, name = 'editor'),
    path('viewer/<int:id>', views.viewer, name = 'viewer'),
    path('viewer/', views.viewer, name = 'viewer'),
    path('viewer/<int:id>/', views.viewer, name = 'highlight'),
    path('viewer/practice/', views.viewer_practice),
    
    
    path('searchPage/', views.searchPage, name = 'searchPage'),
    path('loginPage/', views.loginPage, name = 'loginPage'),
    # url(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
]