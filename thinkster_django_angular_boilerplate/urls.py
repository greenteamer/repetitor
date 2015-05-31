# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url, include
from thinkster_django_angular_boilerplate.views import IndexView
from rest_framework_nested import routers
from authentication.views import AccountViewSet, UserViewSet, CurrentUserView
from authentication.views import def_login_api
from posts.views import PostViewSet, AccountPostsViewSet
from django.contrib import admin
admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', 'authentication.views.def_login_api', name='login'),
    url(r'^api/v1/auth/logout/$','authentication.views.def_login_api', name='login'),
    url(r'^api/v1/auth/current-user/$', CurrentUserView.as_view(), name='current'),
    url('^$', IndexView.as_view(), name='index'),
)

# urlpatterns = patterns(
#     '',
#
#     url('^.*$', IndexView.as_view(), name='index'),
# )
