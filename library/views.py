from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .forms import BookForm
from .models import Book
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import RequestContext

# Create your views here.
def library(request):
    return render(request, 'library/library.html')

# def upload_file(request):
#     if request.method == 'POST' and request.FILES['mybook']:
#         mybook = request.FILES['mybook']
#         fs = FileSystemStorage()
#         filename = fs.save(mybook.name, mybook)
#         uploaded_file_url = fs.url(filename)
#         return render(request, 'library/library.html', {
#             'uploaded_file_url': uploaded_file_url
#         })
#     else:
#         return render(request, 'library/library.html')

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