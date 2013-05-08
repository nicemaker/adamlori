from django.db import models
from django.contrib.contenttypes.models import ContentType
'''
Base Model of Content that is editable in Frontend. Needs classname, and parent class
'''

class CModel( models.Model ):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField( max_length=100,blank=True,default='')
    order = models.PositiveIntegerField(editable=False, default=1, db_index=True)
    
    def className(self ):
        return self.__class__.__name__
    
    def parent(self):
        return None
    
    def contentType(self):
        return 
    
    def natural_key(self):
        return ContentType.objects.get_for_model( self ).natural_key();
    
    def uid(self):
        idTup = self.natural_key() + (self.id,)
        return "%s.%s:%s" % idTup
    
    class Meta:
        abstract = True
        ordering = ['order']
    
    


class Genre( CModel ):
    image = models.FileField(upload_to='soundbook/images/',blank=True,default='')
    def __unicode__(self, ):
        return "%s,%s" % (self.id,self.title)
    
class Sample( CModel):
    mediaId = models.CharField(max_length=100,blank=True,default='')
    audio = models.FileField(upload_to='soundbook/audio/',blank=True,default='')
    image = models.FileField(upload_to='soundbook/images/',blank=True,default='')
    genre = models.ForeignKey( Genre,null=True,blank=True,default=None )
    
    def parent(self):
        return self.genre
    
    
    def __unicode__(self):
        return "%s,%s,%s" % (self.id,self.title, self.mediaId)
    
    def delete(self, *args, **kwargs):
        self.image.delete()
        super(Sample, self).delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        # delete old file when replacing by updating the file
        try:
            this = Sample.objects.get(id=self.id)
            if this.image != self.image:
                this.image.delete(save=False)
        except: pass # when new photo then we do nothing, normal case          
        super(Sample, self).save(*args, **kwargs)
    
        
    
    
    
    

    



