# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from rest_framework import permissions, viewsets, status, views
from rest_framework.decorators import api_view
from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext

from robokassa.forms import RobokassaForm
from project.settings import ADMIN_EMAIL
from django.core.mail import send_mail, EmailMultiAlternatives
from robokassa.signals import result_received

from relationships.models import Order
from authentication.models import Account, TeacherProfile, StudentProfile, repopulateProfile, populateAccountData
from authentication.forms import LoginForm, RegisterForm, TeacherProfileForm, StudentProfileForm
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer, UserSerializers

import json
from django.views.decorators.csrf import csrf_protect
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


class LoginView(TemplateView):
    template_name = 'authentication/login.html'

    def get(self, request):
        form = LoginForm()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        """атворизация пользователя"""
        postdata = request.POST.copy()
        email = postdata.get('email', None)
        password = postdata.get('password', None)
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)
                return HttpResponseRedirect('/')
            else:
                message = u'Вы не авторизировались, аккаунт %s был отключен' % email
                form = LoginForm(postdata)
        else:
            message = 'Вы не авторизировались, email или пароль не верны.'
            form = LoginForm(postdata)
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class RegisterTeacherView(TemplateView):
    template_name = 'authentication/register.html'

    def get(self, request):
        form = RegisterForm()
        profile_form = TeacherProfileForm()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        """регистрация пользователя"""
        postdata = request.POST.copy()
        email = postdata.get('email', None)
        password = postdata.get('password', None)
        username = postdata.get('username', None)

        form = RegisterForm(request.POST)
        profile_form = TeacherProfileForm(request.POST, request.FILES)
        if form.is_valid() and profile_form.is_valid():
            user = Account.objects.create_user(email, password=password, username=username)
            user = populateAccountData(request, user, is_teacher=True)
            login(request, user)
            profile_form.save(user)
            return HttpResponseRedirect('/')

        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class RegisterStudentView(TemplateView):
    template_name = 'authentication/register.html'

    def get(self, request):
        form = RegisterForm()
        profile_form = StudentProfileForm()
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        """регистрация пользователя"""
        postdata = request.POST.copy()
        email = postdata.get('email', None)
        password = postdata.get('password', None)
        username = postdata.get('username', None)

        form = RegisterForm(request.POST)
        profile_form = StudentProfileForm(request.POST)
        if form.is_valid() and profile_form.is_valid():
            user = Account.objects.create_user(email, password=password, username=username)
            user = populateAccountData(request, user, is_teacher=False)
            login(request, user)
            profile_form.save(user)
            return HttpResponseRedirect('/')

        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class LogoutView(TemplateView):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect('/')


class ProfileView(TemplateView):
    template_name = 'authentication/profile.html'

    def get(self, request):
        if request.user.is_authenticated() and request.user.get_profile():  # если есть созданный профиль
            if request.user.profile.is_teacher:
                form = TeacherProfileForm(instance=request.user.profile)
            elif request.user.profile.is_student:
                form = StudentProfileForm(instance=request.user.profile)
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        if request.user.is_authenticated():
            profile = request.user.get_profile()
            if profile and profile.is_teacher:
                form = TeacherProfileForm(request.POST, request.FILES)
            elif profile and profile.is_student:
                form = StudentProfileForm(request.POST)
            if profile and form.is_valid():
                profile = repopulateProfile(profile, request)
                profile.save()

        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class TeacherAccountView(TemplateView):
    template_name = 'authentication/teacher_account.html'

    def get(self, request):
        if request.user.is_authenticated() and request.user.is_teacher:  # если есть созданный профиль
            teacher = request.user.get_profile()
            orders = Order.objects.filter(teacher=teacher)
            for order in orders:
                order.form = RobokassaForm(initial={
                    'OutSum': order.price,
                    'InvId': order.id,
                })
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


class StudentAccountView(TemplateView):
    template_name = 'authentication/student_account.html'

    def get(self, request):
        if request.user.is_authenticated() and request.user.is_student:  # если есть созданный профиль
            student = request.user.get_profile()
            orders = Order.objects.filter(student=student)
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))

    def post(self, request):
        return render_to_response(self.template_name, locals(), context_instance=RequestContext(request))


def payment_received(sender, **kwargs):
    """обрабатываем сигнал оплаты от платежной системы"""
    order = Order.objects.get(id=kwargs['InvId'])
    order.is_paid = True
    order.save()

    subject = u'Заказ №%s - оплачен' % order.id
    message = u'Номер заказа: %s \n репетитор: %s, телефон: %s \n ученик: %s, телефон: %s' % (order.id, order.teacher.email, order.teacher.account.phone, order.student.email, order.student.account.phone, )
    send_mail(subject, message, 'teamer777@gmail.com', [ADMIN_EMAIL], fail_silently=False)

    subject = u'Ваш заказ №%s - оплачен' % order.id
    message = u'Номер заказа %s \n Спасибо, что выбрали нас!' % order.id
    send_mail(subject, message, 'teamer777@gmail.com', [order.teacher.account.email], fail_silently=False)

result_received.connect(payment_received)
