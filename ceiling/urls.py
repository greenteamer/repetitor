# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url, include
from ceiling.views import CeilingView

urlpatterns = patterns('',
    url('^$', CeilingView.as_view(), name='ceiling'),
    url('^api/$', CeilingView.as_view(), name='ceiling'),
)
