# Create your views here.

from soundbook.models import Sample
from soundbook.serializers import SampleSerializer

from django.shortcuts import render
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from soundbook.forms import SampleForm

def index(request):
    return render(request,'soundbook/index.html',{})


def edit_sample(request, pk ):
    item = get_object_or_404( Sample, pk = pk )
    if request.method == 'GET':
        form = SampleForm( instance = item )
        context = RequestContext(request, {'form' : form })
        return render_to_response( 'soundbook/sampleEdit.html', context )

        
        
class SampleList(APIView):
    """
    List all Samples, or create new Sample
    """
    def get(self, request, format=None ):
        samples = Sample.objects.all()
        serializer = SampleSerializer( samples, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None ):
        serializer = SampleSerializer(data=request.DATA,files=request.FILES)
        
        """
        serializer.from_native(drequest.FILES)
        """
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
class SampleDetail(APIView):
    """
    Retrieve, update or delete a Sample
    """
   
        
    def get(self, request, pk, format=None ):
        sample = get_object_or_404( Sample, pk )
        serializer = SampleSerializer(sample)
        return Response( serializer.data )
    
    def put(self, request, pk, format=None ):
        sample = get_object_or_404( Sample, pk )
        serializer = SampleSerializer( sample, data= request.DATA )
        if serializer.is_valid():
            serializer.save();
            return Response( serializer.data )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
    def delete(self, pk, format=None):
        sample = get_object_or_404( Sample, pk )
        sample.delete
        return Response( status=HTTP_204_NO_CONTENT )
    
    
    
    

    
        
    
