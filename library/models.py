#-*-coding:utf-8-*-
from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
# Create your models here


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    # return 'user_{0}/{1}'.format(instance.user.id, filename)
    return 'documents/%Y/%m/%d'



# class Document(models.Model): 
#     title = models.CharField(max_length=256, null=True);
#     brief_description = models.CharField(max_length=256, null=True);
#     created_at = models.DateTimeField(default=timezone.now);
#     updated_at = models.DateTimeField(blank=True, null=True);
 
#     def __str__(self):
#         return self.title



class Highlight(models.Model) :
    # selection_object = models.여기다가 오브젝트를 받아오고 싶어!
    # highlight_color = models.CharField(max_length=256, null=True);
    highlight_text = models.TextField(null=True);
    highlight_location_ancher = models.IntegerField(null=True);
    highlight_location_focus = models.IntegerField(null=True);
    highlight_memo = models.TextField(null=True);
    created_at = models.DateTimeField(default=timezone.now);

# Create your models here.



class Book(models.Model):
    title = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/%Y/%m/%d')
    cover = models.ImageField(upload_to='covers/%Y/%m/%d/',blank = True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def filename(self):
        return os.path.basename(self.document.name)

    def filepath(self):
        return os.path.basename(self.document.path)

    # def prepare(self, obj) :
    #     data = super()

