from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('admin/movie_create/', views.admin_movie_create),
    path('admin/movie/<int:movie_id>/', views.admin_movie_update_or_delete),
    
    path('recent/', views.movies_recent),
    path('popular/', views.movies_popular),
    path('random/', views.movies_random),
    path('collection/<username>/', views.movies_collection),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
    path('select/<int:answer_id>/', views.movie_property)
]
