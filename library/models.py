from django.db import models

# Create your models here.

# class Book(models.Model):
#     title = models.CharField(max_length = 256)
#     file = models.Image

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    # return 'user_{0}/{1}'.format(instance.user.id, filename)
    return 'documents/%Y/%m/%d'

class Book(models.Model):
    title = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/%Y/%m/%d')
    uploaded_at = models.DateTimeField(auto_now_add=True)