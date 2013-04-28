from soundbook.models import Sample,Genre
from django.forms import widgets
from rest_framework import serializers

class SampleSerializer(serializers.ModelSerializer):
   class Meta:
    model = Sample
    fields = ('id', 'title', 'mediaId')
   
    
class GenreSerializer(serializers.Serializer):
   class Meta:
    model = Genre
    fields = ('id', 'title')
   

    
    
    