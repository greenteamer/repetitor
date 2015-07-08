# -*- coding: utf-8 -*-
from django.db import models
from authentication.models import Account, TeacherProfile, StudentProfile


class Order(models.Model):
    teacher = models.ForeignKey(TeacherProfile)
    student = models.ForeignKey(StudentProfile)

    subject = models.CharField(max_length=100)
    price = models.IntegerField()

    date = models.DateTimeField(auto_now_add=True)

    id_paid = models.BooleanField(default=False)

    def __unicode__(self):
        return '%s - id заказа %s' % (self.teacher.account.get_full_name(), self.id)
