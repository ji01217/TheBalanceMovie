from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MovieListSerializer, MovieSerializer, CollectionSerializer
from .models import Movie
from community.models import Answer 
from community.serializers.answer import AnswerSerializer
from rest_framework import status
from django.core.paginator import Paginator

User = get_user_model()

@api_view(['POST'])
def admin_movie_create(request):
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(['PUT', 'DELETE'])
def admin_movie_update_or_delete(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)

    def update_article():
        serializer = MovieSerializer(instance=movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete_article():
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'PUT':
        return update_article()
    elif request.method == 'DELETE':
        return delete_article()
    
@api_view(['GET'])
def movies_recent(request):
    movies = Movie.objects.annotate(
            like_count=Count('like_users', distinct=True)
        ).order_by('-release_date')
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movies_popular(request):
    movies = Movie.objects.annotate(
            like_count=Count('like_users', distinct=True)
        ).order_by('-popularity')
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movies_random(request):    
    movies = Movie.objects.annotate(
            like_count=Count('like_users', distinct=True)
        ).order_by('?').all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movies_collection(request, username):
    user = get_object_or_404(User, username=username)
    serializer = CollectionSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = Movie.objects.annotate(
            like_count=Count('like_users', distinct=True)
        ).get(id=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@api_view(['POST'])
def like_movie(request, movie_pk):
    movie = Movie.objects.annotate(
            like_count=Count('like_users', distinct=True)
        ).get(id=movie_pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        movie.like_users.add(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

@api_view(['GET','POST'])
def movie_property(request, answer_id):

    answer = Answer.objects.get(id=answer_id)
    user = request.user

    def property_movie_list():
        movies = Movie.objects.annotate(
                like_count=Count('like_users', distinct=True)
            ).all() # 배열
        select_movies = []
        for movie in movies:
            if movie.genres.filter(id=answer.property).exists():
                select_movies.append(movie)
        
        serializer = MovieListSerializer(select_movies, many=True)
        return Response(serializer.data)
    def save_answer():
        if not answer.select_users.filter(pk=user.pk).exists():
            answer.select_users.add(user)
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

        
    if request.method == 'GET':
        return property_movie_list()
    elif request.method == 'POST':
        return save_answer()