# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.is_active = True
        account.is_staff = True
        account.save()

        return account


class Account(AbstractBaseUser):

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    patronymic = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    phone = models.CharField(max_length=11, blank=True)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()
    backend = 'django.contrib.auth.backends.ModelBackend'

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def get_profile(self):
        try:
            self.profile = TeacherProfile.objects.get(account=self)
            self.profile.is_teacher = True
            self.profile.is_student = False
            return self.profile
        except Exception:
            self.profile = StudentProfile.objects.get(account=self)
            self.profile.is_student = True
            self.profile.is_teacher = False
            return self.profile
        except:
            return None


class TeacherProfile(models.Model):
    """docstring for TeacherProfile"""

    account = models.OneToOneField(Account)
    subject = models.CharField(max_length=200, blank=False)
    skill = models.IntegerField(blank=False)
    price = models.IntegerField(blank=False)
    photo = models.ImageField(upload_to="teachers_photo")

    def get_image_url(self):
        return '/media/%s' % self.photo


class StudentProfile(models.Model):
    """docstring for StudentProfile"""

    account = models.OneToOneField(Account)
    age = models.IntegerField(blank=False)

    def get_image_url(self):
        return '/media/teachers_photo/user.png'


def repopulateProfile(profile, request):
    if profile.is_teacher:
        profile.subject = request.POST['subject']
        profile.skill = request.POST['skill']
        if request.FILES:
            profile.photo = request.FILES['photo']
    elif profile.is_student:
        profile.age = request.POST['age']
    return profile


def populateAccountData(request, user, is_teacher):
    user.first_name = request.POST['first_name']
    user.last_name = request.POST['last_name']
    user.patronymic = request.POST['patronymic']
    user.phone = request.POST['phone']
    user.is_active = True
    if is_teacher:
        user.is_teacher = True
    else:
        user.is_student = True
    user.save()
    return user
