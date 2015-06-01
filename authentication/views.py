# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import permissions, viewsets, status, views
from rest_framework.decorators import api_view

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer, UserSerializers

from django.views.decorators.csrf import csrf_protect

import json

from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response


class CurrentUserView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        try:
            serializer = UserSerializers(request.user)
            return Response(serializer.data)
        except:
            pass


@csrf_protect
def def_login_api(request):
    if request.method == 'POST':
        postdata = request.POST.copy()
        email = postdata.get('email', None)
        password = postdata.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                data = json.dumps({
                    'email': email,
                    'username': account.username,
                    'message': u'Вы авторизировались, Ваш аккаунт: %s.' % email,
                    'status': 'ok'
                })
            else:
                return HttpResponse(json.dumps({
                    'message': u'Вы не авторизировались, аккаунт %s был отключен.' % email,
                    'status': 'fail'
                }), )
        else:
            return HttpResponse(json.dumps({
                'message': u'Вы не авторизировались, email или пароль не верны.',
                'status': 'fail'
                }), content_type="application/json")

    if request.method == 'GET':

        logout(request)
        data = json.dumps({
            'message': u'Вы успешно вышли',
            'status': 'ok'
        })

    return HttpResponse(data, content_type="application/json")


class UserViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = UserSerializers

    # def get(self, request, format=None):
    #     content = {
    #         'user': unicode(request.user),  # `django.contrib.auth.User` instance.
    #         'auth': unicode(request.auth),  # None
    #     }
    #     return Response(content)


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return HttpResponse(json.dumps({
                    'message': u'Вы успешно зарегистрировались, дальнейшие инструкции поступят Вам на электронную почту.',
                }), content_type="application/json")

        return Response({
            'status': 'Bad request',
            'message': u'Аккаунт не может быть создан с полученными данными.'
        }, status=status.HTTP_400_BAD_REQUEST)
