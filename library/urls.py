from django.urls import path
from library import views
# from django.conf.urls import url
# from django.views.generic import RedirectView


app_name="library"

urlpatterns = [
    path('', views.library, name = 'library'),
    path('collectHighlight/', views.collectHighlight, name = 'collectHighlight'),
    path('editor/', views.editor, name = 'editor'),
    path('viewer/', views.viewer, name = 'viewer'),
    path('searchPage/', views.searchPage, name = 'searchPage'),

    # url(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
]