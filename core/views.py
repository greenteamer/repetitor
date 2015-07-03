# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response, RequestContext
from django.views.generic.base import TemplateView
from core.models import Page, Article
from relationships.models import Order
from authentication.models import TeacherProfile, StudentProfile


class IndexView(TemplateView):
    template_name = 'core/index.html'

    def get(self, request):
        teachers = TeacherProfile.objects.all()
        students = StudentProfile.objects.all()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        if 'order' in request.POST:
            order = Order()
            order.teacher = TeacherProfile.objects.get(id=request.POST['id'])
            order.student = request.user.get_profile()
            order.subject = order.teacher.subject
            order.price = order.teacher.price
            order.save()
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
