from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

from soundbook import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'adamlori.views.home', name='home'),
    # url(r'^adamlori/', include('adamlori.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^edit/genre/$', views.GenreEdit.as_view() ),
    url(r'^edit/genre/(?P<pk>[0-9]+)/$', views.GenreEdit.as_view() ),#Admin
    url(r'^sort/$', 'soundbook.views.sort', name='Sort List' ),
)
