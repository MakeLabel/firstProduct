from __future__ import unicode_literals
from django.core.checks import messages
from library.models import Highlight
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import auth
from django.shortcuts import redirect
from django.contrib import messages
# from django.contrib.auth.models import User 
#-*-coding:utf-8-*-
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
import textract

# Create your views here.
from PyPDF2 import PdfFileReader, PdfFileWriter

def save_first_page(page, id):
    img_io = BytesIO()
    page.save(img_io, format='JPEG', quality=100)
    img_content = ContentFile(img_io.getvalue(), 'bookcover_{0}.jpg'.format(id))
    return img_content

def landingPage(request) :
    if  request.method == "POST" :
        username = request.POST['username']
        print(username)
        email = request.POST['email']
        password = request.POST['password']
        #### 중복 이메일 아이디 계정 못 만들게 설정 해야 함. 
        if not User.objects.filter(username=username).exists():

            if request.POST['password'] == request.POST['password-check'] :
                user = User.objects.create_user(email=request.POST['email'], username=request.POST['username'], password=request.POST['password'])
            else :
                print("비밀번호를 정확히 적어주세요.")
            auth.login(request, user)
            return redirect('/library')
        else : 
            messages.error(request, 'Already existing User Name')
            

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
            pages = convert_from_path('{0}'.format(tmp))
            page = pages[0]
            newbook.cover = save_first_page(page, newbook.id)
            newbook.title = newbook.filename()
            print("debug" + newbook.title)
            newbook.save()
            return HttpResponseRedirect(reverse('library:upload'))
    else:
        form = BookForm()
    books = Book.objects.all()

    return render(request, 'library/library.html', {'books' : books, 'form' : form})

def collectHighlight(request):
    highlights = Highlight.objects.all()
    return render(request, 'library/collectHighlight.html', {'highlights':highlights})

def editor(request):
    return render(request, 'library/editor.html')

# # 인규가 짠 부분
# def viewer(request, rid=0) :
#     highlights = Highlight.objects.all()
#     highlights_practice = Highlight.objects.all() 
#     print(type(highlights_practice))
    
    
#     if request.method == "GET" :
#         if rid == 0 :
#             return render(request, 'library/viewer.html', {'highlights':highlights, 'highlight_flag' : '1'})
#         else :
#             chosen_highlight = Highlight.objects.get(id=id)
#             return render(request, 'library/viewer.html', {'highlights':chosen_highlight, 'highlight_flag' : '2'})
#     elif request.method == "POST" :
#         # highlight_color = request.POST['']
#         highlight_text = request.POST['highlight_text']
#         print(highlight_text)
#         highlight_location_ancher = request.POST['highlight_location_ancher']
#         highlight_location_focus = request.POST['highlight_location_focus']
#         Highlight.objects.create(highlight_text = highlight_text, highlight_location_ancher = highlight_location_ancher, highlight_location_focus = highlight_location_focus)
#         return render(request, 'library/viewer.html', {'hightlights':highlights})

# 경원이 짠 부분
def viewer(request, id):
    book = Book.objects.get(id=id)
    return render(request, 'library/viewer2.html', {'book_url' : book.document.url})
# def viewer(request):
#     return render(request, 'library/viewer.html')

def viewer_practice(request):
    return render(request, 'library/viewer_practice.html' )


def searchPage(request):
    if request.method == "POST" :
        searched = request.POST['searched']
        print(searched)
        print(type(searched))
        searched_title_results = Book.objects.filter(title__icontains = searched) 
        # searched_highlighted_text = 
        searched_non_highlighted_text = textract.process("/Users/inkyuoh/Desktop/Label_code/firstProduct/media/documents/2021/10/17/Strategy_Und_Part4_CompDynamics.pdf")[:300]
        print(searched_non_highlighted_text)

        print(searched_title_results)
        return render(request, 'library/searchPage.html', {'searched' : searched, 'searched_title_results' : searched_title_results })
    else : 
        return render(request, 'library/searchPage.html', {})


def loginPage(request):
    return render(request, 'library/loginPage.html')

def accountSetting(request):
    return render(request, 'library/accountSetting.html')

def parse_to_string(filename):
    return textract.process(filename)