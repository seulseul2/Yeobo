from django.db import models

# Create your models here.

class Attraction(models.Model):
    attraction_id = models.BigAutoField(primary_key=True) # contentid
    name = models.CharField(max_length=255, blank=True, null=True) # title
    description = models.CharField(max_length=10000, blank=True, null=True) # overview
    address = models.CharField(max_length=255, blank=True, null=True) # addr1
    areacode = models.IntegerField(null=True)
    image = models.CharField(max_length=255, blank=True, null=True) # firstimage
    image2 = models.CharField(max_length=255, blank=True, null=True) # firstimage2
    mapx = models.FloatField(blank=True, null=True) # mapx
    mapy = models.FloatField(blank=True, null=True) # mapy
    score = models.FloatField(blank=True, null=True) # 기본값 0.0
    readcount = models.IntegerField(null=True) # readcount

    class Meta:
        # managed = False
        db_table = 'attraction'