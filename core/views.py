# -*- coding: utf-8 -*-
import datetime
import pytz
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, render_to_response, RequestContext
from django.views.generic.base import TemplateView
from core.models import Page, Article
from relationships.models import Order, Offer, Announcement
from relationships import relationships
from authentication.models import TeacherProfile, StudentProfile


class IndexView(TemplateView):
    template_name = 'core/index.html'

    def get(self, request, **kwargs):
        teachers = TeacherProfile.objects.all()
        students = StudentProfile.objects.all()
        message = ''
        announcements = Announcement.objects.filter(status='is_active').order_by('-date')
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request, **kwargs):
        if 'order' in request.POST:
            """проверка что такиой заказ уже существует либо делался недавно"""
            tmp_teacher = TeacherProfile.objects.get(id=request.POST['id'])
            tmp_student = request.user.get_profile()
            tmp_announcement = Announcement.objects.get(id=request.POST['announcement_exist'])
            """функция relationships.create_order создает заказ и возвращает сообщение с результатом"""
            message = relationships.create_order(tmp_teacher, tmp_student, tmp_announcement)

        if 'offer' in request.POST:
            """проверка что такая заявка уже существует либо делалась недавно"""
            tmp_teacher = TeacherProfile.objects.get(account=request.user)
            tmp_student = StudentProfile.objects.get(id=request.POST['student_id'])
            tmp_announcement = Announcement.objects.get(id=request.POST['announcement_id'])
            """функция relationships.create_offer создает заявку и возвращает сообщение с результатом"""
            message = relationships.create_offer(tmp_teacher, tmp_student, tmp_announcement)

        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))




class PagesView(TemplateView):
    template_name = "core/pages.html"

    def get(self, request):
        pages = Page.objects.all()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class PageView(TemplateView):
    template_name = "core/page.html"

    def get(self, request, slug):
        page = Page.objects.get(slug=slug)
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class ArticlesView(TemplateView):
    template_name = "core/articles.html"

    def get(self, request):
        articles = Article.objects.all()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class ArticleView(TemplateView):
    template_name = "core/article.html"

    def get(self, request, slug):
        article = Article.objects.get(slug=slug)
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))
