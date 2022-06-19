from django.contrib import admin
from .models import Movie
# Register your models here.
class MovieAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'release_date', 'popularity', 'vote_count',
                    'vote_average', 'overview', 'poster_path', 'adult', 'youtube_key')

admin.site.register(Movie, MovieAdmin)