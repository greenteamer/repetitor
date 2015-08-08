# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, render_to_response, RequestContext
from django.views.generic.base import TemplateView
from PIL import Image, ImageDraw



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
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))
