# Create your views here.


from soundbook.forms import ContactForm
from soundbook.models import Genre,Sample,NameValue,TextField, Reference

from django.shortcuts import render,render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.contenttypes.models import ContentType
from django.views.generic import TemplateView
from django.core import serializers

import json

def index(request):
    genres = Genre.objects.all()
    references = Reference.objects.all();
    text = TextField.objects.all()
    setting = NameValue.objects.all()
    c = RequestContext( request, {"genres":genres, "form": ContactForm(), "references": references })
    return render_to_response('soundbook/index.html', c)

def contact(request):
    if request.method == 'POST': # If the form has been submitted...
        form = ContactForm(request.POST) # A form bound to the POST data
        if form.is_valid():
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            sender = form.cleaned_data['sender']
            cc_myself = form.cleaned_data['cc_myself']
            recipients = ['hello@nicemaker.me']
            if cc_myself:
                recipients.append(sender)
            
            from django.core.mail import send_mail
            send_mail(subject, message, sender, recipients)

            data = json.dumps( {"type":"success"})
            return HttpResponse( data ) # Redirect after POST
    c = RequestContext( request, {'form': form})
    return render_to_response('soundbook/contact.html',c)


class SampleList( TemplateView ):
    """
    Returns all Samples or from a specific Genre  by pk = id
    """
    def get(self,request):
        if request.GET.has_key( 'pk'):
            pk = request.GET['pk']
            genre = get_object_or_404( Genre, pk = pk )
            samples = genre.sample_set.all();
        else:
            samples = Sample.objects.all();
        data = serializers.serialize("json", samples )
        return HttpResponse( data );

class GenreList(TemplateView):
    """
    Returns all Genres
    """
    def get(self, request   ):
        data = serializers.serialize("json", Genre.objects.all())
        return HttpResponse( data );
    

    
   

   
        
    
