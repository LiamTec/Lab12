from django.db import models

# Create your models here.
class Category (models.Model):
    description = models.CharField(max_length=100)
    
    def __str__(self):
        return self.description

from django.db import models

class Serie(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    img = models.ImageField(upload_to='series_images/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
