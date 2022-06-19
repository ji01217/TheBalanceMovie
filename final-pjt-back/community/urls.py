from django.urls import path
from . import views

app_name = 'community'

urlpatterns = [
    path('new/', views.answer_create),
    path('questions/', views.question_list),
    path('questions/random/', views.question_list_random),
    path('question/<int:question_pk>/', views.question_detail),
    path('<int:answer_pk>/', views.comment_list_create),
    path('<int:answer_pk>/<int:comment_pk>/', views.comment_update_delete)
]
