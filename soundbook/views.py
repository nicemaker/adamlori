# Create your views here.


from soundbook.forms import SampleForm, GenreForm
from soundbook.models import Genre,Sample

from django.shortcuts import render,render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.contenttypes.models import ContentType
from django.views.generic import TemplateView

import json

def index(request):
    return render(request,'soundbook/index.html',{"genres":Genre.objects.all()})


def sort( request ):
    order = json.loads( request.body )
    for i,uid in enumerate( order ):
        modelId = uid.split(":")
        ct = ContentType.objects.get_by_natural_key( *modelId[0].split(".") )
        sample = get_object_or_404( ct.model_class(), pk=modelId[1] )
        sample.order = i
        sample.save()
    data = {"type":"complete"}
    return HttpResponse( json.dumps( data ) )


class SampleEdit( TemplateView):
    
    def get(request, pk ):
        item = get_object_or_404( Sample, pk = pk )
        form = SampleForm( instance = item )
        context = RequestContext(request, {'form' : form })
        return render_to_response( 'soundbook/sampleEdit.html', context )
    
    def post(self ):
        item = get_object_or_404( Sample, pk = pk )
        form = SampleForm( request.POST, request.FILES, instance=item, )
        if form.is_valid():
            form.save()
        form = SampleForm( instance = form.instance ) #workaround, just simply saving the form doesn't return correct image url
        context = RequestContext( request, {'form' : form } )
        return render_to_response( 'soundbook/sample_edit.html', context )
    
        
      
class GenreEdit(TemplateView):
    """
    List all Genres, or create new Genre
    """
    def get( self, request, pk ):
        genre = get_object_or_404( Genre, pk = pk) if pk else Genre()
        form = GenreForm( instance=genre, data=request.GET,files=request.FILES)
        if form.is_valid():
            form.save()
        context = RequestContext( request, {'form' : form } )
        return render_to_response( 'soundbook/genre_edit.html', context )
    
    def post(self,request, pk ):
        genre = get_object_or_404( Genre, pk = pk)
        form = GenreForm( instance=genre, data=request.POST,files=request.FILES)
        if form.is_valid():
            form.save()
        context = RequestContext( request, {'form' : form } )
        return render_to_response( 'soundbook/genre_edit.html', context )
    
    
    def delete( request, pk ):
        genre = get_object_or_404( Genre, pk = pk)
        genre.delete()
        data = {"type":"complete"}
        return HttpResponse( json.dumps( data ) )
    
          

    
    
    
    

    
        
    
