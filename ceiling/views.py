# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, render_to_response, RequestContext
from django.views.generic.base import TemplateView
from PIL import Image, ImageDraw
import urllib
from django.views.decorators.csrf import csrf_protect

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets

from authentication.models import Account, TeacherProfile


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = ('id', 'subject')


class CeilingRequest(viewsets.ModelViewSet):
    queryset = TeacherProfile.objects.all()
    serializer_class = AccountSerializer
    #  def get(self, request, format=None):
    #     accounts = [account.username for account in Account.objects.all()]
    #     return Response(accounts)


class CeilingView(TemplateView):
    template_name = 'ceiling/ceiling.html'

    def get(self, request, **kwargs):
        image = Image.new("RGB", (1000, 800), 'white')
        draw = ImageDraw.Draw(image)

        draw.line((10, 10, 300, 300), 'red')
        draw.line((300, 300, 400, 300), 'red')
        draw.line((400, 300, 400, 10), 'red')
        draw.line((400, 10, 10, 10), 'red')

        # serialize to HTTP response
        response = HttpResponse(content_type="image/png")
        image.save(response, "PNG")

        return response
        # return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request, **kwargs):
        text = urllib.urlencode(request.POST)
        file_ = open('test.txt', 'w')
        file_.write(text)
        file_.close()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))
