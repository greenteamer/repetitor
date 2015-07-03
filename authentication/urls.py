# -*- coding: utf-8 -*-
#!/usr/bin/env python
from django.conf.urls import patterns, include, url
from authentication.views import LoginView, RegisterTeacherView, RegisterStudentView, LogoutView, ProfileView, TeacherAccountView, StudentAccountView

urlpatterns = patterns('project.core.views',
    url('^profile/$', ProfileView.as_view(), name='profile'),
    url('^teacher-account/$', TeacherAccountView.as_view(), name='teacher-account'),
    url('^student-account/$', StudentAccountView.as_view(), name='student-account'),

    url('^login/$', LoginView.as_view(), name='login'),
    url('^logout/$', LogoutView.as_view(), name='logout'),

    url('^register-teacher/$', RegisterTeacherView.as_view(), name='register-teacher'),
    url('^register-student/$', RegisterStudentView.as_view(), name='register-student'),
)
