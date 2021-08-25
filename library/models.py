#-*-coding:utf-8-*-
from __future__ import unicode_literals
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import os


# Create your models here.

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    # return 'user_{0}/{1}'.format(instance.user.id, filename)
    return 'documents/%Y/%m/%d'

class Book(models.Model):
    title = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/%Y/%m/%d')
    cover = models.ImageField(upload_to='covers/%Y/%m/%d/',blank = True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def filename(self):
        return os.path.basename(self.document.name)

    def filepath(self):
        return os.path.basename(self.document.path)

