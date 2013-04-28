# Create your views here.

from django.template import RequestContext
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request,'blocks/index.html',{})
  

def get(request):
    data = request.GET;
    
    return HttpResponse(data);

def post(request):
    data = request.POST;
    return HttpResponse('bla',content_type="text/plain");
  
  