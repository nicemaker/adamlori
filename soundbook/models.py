from django.db import models


    
class Genre(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField( max_length=100,blank=True,default='')
    
    def __unicode__(self, ):
        return "%s,%s" % (self.id,self.title)
    
class Sample(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100,blank=True,default='')
    mediaId = models.CharField(max_length=100,blank=True,default='')
    image = models.FileField(upload_to='soundbook/',blank=True,default='')
    genre = models.ForeignKey( Genre )
    
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
    
    

    



