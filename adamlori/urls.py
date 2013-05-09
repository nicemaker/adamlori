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
    url(r'^soundbook/', include('soundbook.urls') ),
    url(r'^$', 'soundbook.views.index', name='index'),
    
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

