from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver 
from django.core.exceptions import ObjectDoesNotExist


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=128, blank=True)
    college = models.CharField(max_length=20, blank=True)
    major = models.CharField(max_length=20, blank=True)
    

    def __str__(self) :
        return f'id={self.id}, user_id={self.user.id}, user_email = {self.user.email}, college={self.college}, major={self.major}'

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        try: 
            instance.profile.save()
        except ObjectDoesNotExist :
            Profile.objects.create(user=instance)






    #     if created :
    #         Profile.objects.create(user=instance)

    # @receiver(post_save, sender=User)
    # def save_user_profile(sender, instance, **kwargs):
    #     instance.profile.save()



