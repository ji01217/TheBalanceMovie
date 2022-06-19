from operator import mod
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Genre(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Actor(models.Model):    
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Company(models.Model):
    company = models.CharField(max_length=100)
    def __str__(self):
        return self.company
    
class Country(models.Model):
    country = models.CharField(max_length=100)
    def __str__(self):
        return self.country

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    adult = models.BooleanField()
    youtube_key = models.CharField(max_length=100)

    genres = models.ManyToManyField(Genre, related_name='movies')
    like_users = models.ManyToManyField(User, related_name='like_movies')
    actors = models.ManyToManyField(Actor, related_name='movies')
    company = models.ManyToManyField(Company, related_name='movies')
    country = models.ManyToManyField(Country, related_name='movies')


    def __str__(self):
        return self.title
