from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here


class Document(models.Model): 
    title = models.CharField(max_length=256, null=True);
    brief_description = models.CharField(max_length=256, null=True);
    created_at = models.DateTimeField(default=timezone.now);
    updated_at = models.DateTimeField(blank=True, null=True);
 
    def __str__(self):
        return self.title



class Highlight(models.Model) :
    # selection_object = models.여기다가 오브젝트를 받아오고 싶어!
    # highlight_color = models.CharField(max_length=256, null=True);
    highlight_text = models.TextField(null=True);
    highlight_location_ancher = models.IntegerField(null=True);
    highlight_location_focus = models.IntegerField(null=True);
    highlight_memo = models.TextField(null=True);
    created_at = models.DateTimeField(default=timezone.now);
    
    

    
