from django.core.checks import messages
from library.models import Highlight
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib import auth
from django.shortcuts import redirect
from django.contrib import messages
# from django.contrib.auth.models import User 

# Create your views here.


def landingPage(request) :
    if  request.method == "POST" :
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        #### 중복 이메일 아이디 계정 못 만들게 설정 해야 함. 
        if not User.objects.filter(username=username).exists():

            if request.POST['password'] == request.POST['password-check'] :
                user = User.objects.create_user(email=request.POST['email'], username=request.POST['username'], password=request.POST['password'])
            else :
                print("비밀번호를 정확히 적어주세요.")
            auth.login(request,user)
            return redirect('/library')
        else : 
            messages.error(request, 'Already existing User Name')
            

    return render(request, 'library/landingPage.html')



def library(request):
    return render(request, 'library/library.html')

def collectHighlight(request):
    highlights = Highlight.objects.all()
    return render(request, 'library/collectHighlight.html', {'highlights':highlights})

def editor(request):
    return render(request, 'library/editor.html')

def viewer(request, id=0) :
    highlights = Highlight.objects.all()
    highlights_practice = Highlight.objects.all() 
    print(type(highlights_practice))
    
    
    if request.method == "GET" :
        if id == 0 :
            return render(request, 'library/viewer.html', {'highlights':highlights, 'highlight_flag' : '1'})
        else :
            chosen_highlight = Highlight.objects.get(id=id)
            return render(request, 'library/viewer.html', {'highlights':chosen_highlight, 'highlight_flag' : '2'})
    elif request.method == "POST" :
        # highlight_color = request.POST['']
        highlight_text = request.POST['highlight_text']
        print(highlight_text)
        highlight_location_ancher = request.POST['highlight_location_ancher']
        highlight_location_focus = request.POST['highlight_location_focus']
        Highlight.objects.create(highlight_text = highlight_text, highlight_location_ancher = highlight_location_ancher, highlight_location_focus = highlight_location_focus)
        return render(request, 'library/viewer.html', {'hightlights':highlights})

def searchPage(request):
    return render(request, 'library/searchPage.html')

def loginPage(request):
    return render(request, 'library/loginPage.html')

