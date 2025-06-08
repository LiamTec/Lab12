from rest_framework import serializers
from .models import Serie, Category

        
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        
        model = Category
        
        fields = ('id' , 'description')


class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        fields = ('id', 'name', 'description', 'img', 'category')
