from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

from soundbook import views
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'adamlori.views.home', name='home'),
    # url(r'^adamlori/', include('adamlori.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'soundbook.views.index', name='index'),
    url(r'^api/samples/$', views.SampleList.as_view()),
    url(r'^api/samples/(?P<pk>[0-9]+)/$', views.SampleDetail.as_view()),
    url(r'^samples/(?P<pk>[0-9]+)/$', 'soundbook.views.edit_sample', name='Edit Sample' ),
    url(r'^sort/$', 'soundbook.views.sort', name='Sort List' ),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
