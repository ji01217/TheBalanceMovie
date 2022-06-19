from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    # review
    path('<int:movie_pk>/', views.review_list_create),
    path('review/<int:review_pk>/', views.review_detail_or_update_or_delete),
    path('review/<int:review_pk>/like/', views.like_review),
    # comments
    path('<int:review_pk>/comments/', views.create_comment),
    path('<int:review_pk>/comments/<int:comment_pk>/', views.comment_update_or_delete)
]