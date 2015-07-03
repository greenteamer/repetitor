# -*- coding: utf-8 -*-
from django.db import models


class Page(models.Model):
    """docstring for Page"""
    title = models.CharField(max_length=40)
    slug = models.SlugField(max_length=40)
    text = models.CharField(max_length=240)

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        return "/page/%s/" % self.slug


class Article(models.Model):
    """docstring for Page"""
    title = models.CharField(max_length=40)
    slug = models.SlugField(max_length=40)
    text = models.CharField(max_length=240)

    def __unicode__(self):
        return self.title

    def get_absolute_url(self):
        return "/article/%s/" % self.slug
