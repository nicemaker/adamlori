from django import forms

from soundbook.models import Sample, Genre

class GenreForm(forms.ModelForm):
    class Meta:
        model = Genre

        
class SampleForm(forms.ModelForm):
    class Meta:
        model = Sample
    
