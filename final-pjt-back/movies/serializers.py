from rest_framework import serializers
from django.contrib.auth import get_user_model
from reviews.serializers import ReviewSerializer
from .models import Movie, Actor, Country, Company, Genre
User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):

    reviews = ReviewSerializer(many=True, read_only=True)
    
    like_count = serializers.IntegerField(read_only=True)

    class ActorSerializer(serializers.ModelSerializer):
        class Meta:
            model = Actor
            fields = '__all__'
    actors = ActorSerializer(many=True, read_only=True)

    class CountrySerializer(serializers.ModelSerializer):
        class Meta:
            model = Country
            fields = '__all__'
    country = CountrySerializer(many=True, read_only=True)

    class CompanySerializer(serializers.ModelSerializer):
        class Meta:
            model = Company
            fields = '__all__'
    company = CompanySerializer(many=True, read_only=True)

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields = '__all__'
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('like_users',)
        
        
class MovieListSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField()
    class Meta:
        model = Movie
        fields = ('id', 'title', 'poster_path', 'like_count', 'like_users')


class CollectionSerializer(serializers.ModelSerializer):
    class MovieSerializer(serializers.ModelSerializer):
        like_count = serializers.IntegerField(source='like_users.count', read_only=True)
        class Meta:
            model = Movie
            fields = ('id', 'title', 'poster_path', 'like_count', 'like_users')

    like_movies = MovieSerializer(many=True, read_only =True)
    
    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'like_movies' )
    