from django.db import models

class StoreThumbnail(models.Model):
    branch = models.CharField(max_length=64)
    thumbnail = models.URLField()
