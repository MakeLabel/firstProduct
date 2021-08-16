from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import BookForm
from .models import Book
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import RequestContext

# Create your views here.
from PyPDF2 import PdfFileReader, PdfFileWriter



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
    return render(request, 'library/viewer.html', {'book_url' : book.document.url})