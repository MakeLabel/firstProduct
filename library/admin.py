from django.contrib import admin
from .models import Highlight
# Register your models here.

admin.site.register(Highlight)

from .models import Book

# Register your models here.
admin.site.register(Book)
