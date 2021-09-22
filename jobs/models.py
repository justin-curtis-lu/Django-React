from django.db import models


class Job(models.Model):
    position = models.CharField(max_length=70, blank=False, default='')
    company = models.CharField(max_length=70,blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    offer = models.BooleanField(default=False)