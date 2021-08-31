#-*-coding:utf-8-*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import BookForm
from .models import Book
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import RequestContext
from pdf2image import convert_from_path
from PIL import Image
from django.core.files.base import ContentFile
from io import StringIO, BytesIO

# Create your views here.
from PyPDF2 import PdfFileReader, PdfFileWriter

def save_first_page(page, id):
    img_io = BytesIO()
    page.save(img_io, format='JPEG', quality=100)
    img_content = ContentFile(img_io.getvalue(), 'bookcover_{0}.jpg'.format(id))
    return img_content

def landingPage(request) :
    return render(request, 'library/landingPage.html')

def library(request):
    return render(request, 'library/library.html')

def pdf_iframe(request):
    return render(request, 'web/viewer.html')

def upload_file(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            newbook = Book(document=request.FILES['book'])
            newbook.save()
            tmp = newbook.document.path.encode().decode()
            pages = convert_from_path('{0}'.format(tmp), poppler_path=r'C:\poppler-0.68.0\bin')
            page = pages[0]
            newbook.cover = save_first_page(page, newbook.id)
            newbook.save()
            return HttpResponseRedirect(reverse('library:upload'))
    else:
        form = BookForm()
    books = Book.objects.all()
    return render(
        request,
        'library/library.html',
        {'books' : books, 'form' : form}
    )
def collectHighlight(request):
    return render(request, 'library/collectHighlight.html')

def editor(request):
    return render(request, 'library/editor.html')

def viewer(request, id):
    book = Book.objects.get(id=id)
    return render(request, 'library/viewer2.html', {'book_url' : book.document.url})
# def viewer(request):
#     return render(request, 'library/viewer.html')

def searchPage(request):
    return render(request, 'library/searchPage.html')

def loginPage(request):
    return render(request, 'library/loginPage.html')

def accountSetting(request):
    return render(request, 'library/accountSetting.html')

