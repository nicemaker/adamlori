from django.db import models
from filebrowser.fields import FileBrowseField
from django.contrib.contenttypes.models import ContentType
'''
Base Model of Content that is editable in Frontend. Needs classname, and parent class
'''

    

class BaseModel( models.Model ):
    
    class Meta:
        abstract = True
        ordering = ['order']
        
    name = models.CharField( "Name", max_length=100,blank=True,default='')
    description = models.CharField( "Description", max_length=300,blank=True,default='')
    order = models.PositiveIntegerField("Order", db_index=True, default="1")

    def __unicode__(self):
        return "%s" % (self.name)
    
    @staticmethod
    def autocomplete_search_fields():
        return ("id__iexact", "name__icontains",)
    

class Genre( BaseModel ):
    pass
    
class Sample( BaseModel):
    mediaId = models.CharField("Vimeo ID", max_length=100,blank=True,default='')
    audio_wav = FileBrowseField("Audio WAV", max_length=200, directory="audio/", extensions=[".wav"], blank=True, null=True)
    audio_mp3= FileBrowseField("Audio MP3", max_length=200, directory="audio/", extensions=[".mp3"], blank=True, null=True)
    audio_ogg = FileBrowseField("Audio OGG", max_length=200, directory="audio/", extensions=[".ogg"], blank=True, null=True)
    image = FileBrowseField("Image", max_length=200, directory="images/", extensions=[".png",".jpg"], blank=True, null=True)
    genre = models.ForeignKey( Genre,null=True,blank=True,default=None, verbose_name="Portfolio Genre" )
    

class Reference( BaseModel ):
    image = FileBrowseField("Image", max_length=200, directory="images/", extensions=[".png",".jpg"], blank=True, null=True)
    url = models.CharField("Url", max_length=300,blank=True,default='')
    
 
class TextField(models.Model):
    name = models.CharField( "Name", max_length=100,default='')
    body = models.TextField()

    def __unicode__(self):
        return "%s" % (self.name)
    
    class Meta:
        verbose_name = 'Text Field'
        verbose_name_plural = 'Text Fields' 
    
    
class NameValue(models.Model):
    name = models.CharField( "Name", max_length=100,default='')
    val = models.CharField( "Value", max_length=100,default='')
    
    def __unicode__(self):
        return "%s,%s" % (self.name, self.val)
    
    class Meta:
        verbose_name = 'Setting'
        verbose_name_plural = 'Settings' 
    


    

    

        
    
    
    
    

    



