# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url, include
from core.views import IndexView, PagesView, PageView, ArticleView, ArticlesView

urlpatterns = patterns('',
    url('^$', IndexView.as_view(), name='index'),
    url(r'pages/', PagesView.as_view(), name='pages'),
    url(r'page/(?P<slug>[-\w]+)/$', PageView.as_view(), name='page'),
    url(r'articles/', ArticlesView.as_view(), name='articles'),
    url(r'article/(?P<slug>[-\w]+)/$', ArticleView.as_view(), name='article'),
)
