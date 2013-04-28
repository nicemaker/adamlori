from django.db import models


class Sample(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100,blank=True,default='')
    mediaId = models.CharField(max_length=100,blank=True,default='')
    
    def __unicode__(self):
        return "%s,%s,%s" % (self.id,self.title, self.mediaId)
    
class Genre(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField( max_length=100,blank=True,default='')
    
    def __unicode__(self, ):
        return "%s,%s" % (self.id,self.title)
    



