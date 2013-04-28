# Create your views here.

from soundbook.models import Sample
from soundbook.serializers import SampleSerializer
from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def index(request):
    return render(request,'soundbook/index.html',{})


class SampleList(APIView):
    """
    List all Samples, or create new Sample
    """
    def get(self, request, format=None ):
        samples = Sample.objects.all()
        serializer = SampleSerializer( samples, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None ):
        serializer = SmapleSerializer( data=request.DATA )
        if serializer.isValid():
            serializer.save()
            return Response( serializer.data, status=status.HTTP_201_CREATED )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
class SampleDetail(APIView):
    """
    Retrieve, update or delete a Sample
    """
    def getObject(self,pk ):
        try:
            return Sample.object.get(pk=pk)
        except Sample.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None ):
        sample = self.getObject(pk);
        serializer = SampleSerializer(sample)
        return Response( serializer.data )
    
    def put(self, request, pk, format=None ):
        sample = self.getObject(pk);
        serializer = SampleSerializer( sample, data= request.DATA )
        if serializer.is_valid():
            serializer.save();
            return Response( serializer.data )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
    def delete(self, pk, format=None):
        sample = self.getObject( pk )
        sample.delete
        return Response( status=HTTP_204_NO_CONTENT )
    
    
    
    

    
        
    
