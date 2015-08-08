# -*- coding: utf-8 -*-
from django.db import models
from authentication.models import Account, TeacherProfile, StudentProfile


class Subject(models.Model):
    title = models.CharField(max_length=200)

    def __unicode__(self):
        return self.title


class  Announcement(models.Model):
    student = models.ForeignKey(StudentProfile)
    subject = models.ForeignKey(Subject)
    text = models.TextField()

    date = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        verbose_name=u'Статус',
        max_length=100,
        choices=(
            ('is_active', 'Объявление активно'),
            ('is_canseled', 'Объявление выключено'),
        ),
        default='',)

    def __unicode__(self):
        return "%s - %s" % (self.subject, self.id)


class Order(models.Model):
    teacher = models.ForeignKey(TeacherProfile)
    student = models.ForeignKey(StudentProfile)
    announcement = models.ManyToManyField(Announcement)

    subject = models.CharField(max_length=100)
    price = models.IntegerField()

    date = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        verbose_name=u'Статус',
        max_length=100,
        choices=(
            ('is_active', 'Ученик принят'),
            ('is_canseled', 'Отказ от ученика'),
            ('id_paid', 'Успешные отношения'),
            ('is_fail', 'Отношения прерваны'),
        ),
        default='',)

    def __unicode__(self):
        return u'%s - id заказа %s' % (self.teacher.account.get_full_name(), self.id)


class Comments(models.Model):
    """docstring for Comments"""
    order = models.ForeignKey(Order)
    account = models.ForeignKey(Account)
    text = models.TextField(verbose_name=u"комментарий")

    def __unicode__(self):
        return u"Коментарий заявки от %s" % self.account.get_full_name()


class Offer(models.Model):
    teacher = models.ForeignKey(TeacherProfile)
    student = models.ForeignKey(StudentProfile)
    announcement = models.ManyToManyField(Announcement)

    date = models.DateTimeField(auto_now_add=True)

    is_mutate = models.BooleanField(default=False)

    def __unicode__(self):
        return u"%s предложение для %s" % (self.teacher.account.get_full_name(), self.student.account.get_full_name())


class CommentsOffer(models.Model):
    """docstring for Comments"""
    offer = models.ForeignKey(Offer)
    account = models.ForeignKey(Account)
    text = models.TextField(verbose_name=u"комментарий")

    def __unicode__(self):
        return u"Коментарий запроса от %s" % self.account.get_full_name()
