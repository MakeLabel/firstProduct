from library.models import Highlight
from django.shortcuts import redirect, render

# Create your views here.


def landingPage(request) :
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

