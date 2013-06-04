from django.contrib import admin
from soundbook.models import Genre, Sample, TextField, NameValue, Reference


class SampleInline( admin.StackedInline ):
    model = Sample
    fields = ("name","description","audio_wav","audio_mp3","audio_ogg","image","mediaId","order")
    sortable_field_name = "order"
    extra = 0

    
class GenreAdmin(admin.ModelAdmin):
    inlines = [ SampleInline, ]
    list_display = ("name","description","order",)
    list_editable = ("order",)
    ordering = ("order",)
    

class TextFieldAdmin(admin.ModelAdmin):
    class Media:  
        js = [
            '/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
            '/static/grappelli/tinymce_setup/tinymce_setup.js',
        ]   

admin.site.register( Genre, GenreAdmin)
admin.site.register( Reference )
admin.site.register( TextField, TextFieldAdmin)
admin.site.register( NameValue )

