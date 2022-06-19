from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Movie
from reviews.models import Comment, Review
from community.models import Answer, Comment
from reviews.serializers import ReviewSerializer, CommentSerializer
from community.serializers.answer import AnswerSerializer
from community.serializers.comment import AnswerCommentSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class MovieSerializer(serializers.ModelSerializer):
        like_count = serializers.IntegerField(source='like_users.count', read_only=True)
        class Meta:
            model = Movie
            fields = ('id','title', 'like_count', 'poster_path')

    like_movies = MovieSerializer(many=True)
    
    class ReviewSerializer(serializers.ModelSerializer):
        class Meta:
            model = Review
            exclude = ['user']
            read_only_fields = ('movie',)
            
    reviews = ReviewSerializer(many=True)
    
    class CommentSerializer(serializers.ModelSerializer):
        review = ReviewSerializer()
        class Meta:
            model = Comment
            fields = ('pk', 'content', 'review')            
        
    comments = CommentSerializer(many=True, read_only=True)    
    
    class AnswerSerializer(serializers.ModelSerializer):
        class Meta:
            model = Answer
            fields = ('pk', 'content', 'property', 'question', 'comments')

    select_answers = AnswerSerializer(many=True)
    
    class AnswerCommentSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = ('pk', 'content', 'answer',)
            read_only_fields = ('answer', )
    question_comments = AnswerCommentSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'email', 'like_movies','reviews','comments','select_answers','question_comments' )
