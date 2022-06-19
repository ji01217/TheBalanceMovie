from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import Answer, Question, Comment
from .comment import AnswerCommentSerializer

User = get_user_model()

class QuestionSerializer(serializers.ModelSerializer):
    class AnswerSerializer(serializers.ModelSerializer):
        class AnswerCommentSerializer(serializers.ModelSerializer):
            class UserSerializer(serializers.ModelSerializer):
                class Meta:
                    model = User
                    fields = ('pk', 'username')
            user = UserSerializer(read_only=True)
            class Meta:
                model = Comment
                fields = ('pk', 'user', 'content')
        comments = AnswerCommentSerializer(read_only=True, many=True)
            
        class Meta:
            model = Answer
            fields = '__all__'
    answer = AnswerSerializer(read_only=True, many=True)
    
    class Meta:
        model = Question
        fields = '__all__'
        
class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('title',)


class AnswerSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    select_users = UserSerializer(read_only=True, many=True)
    
    class AnswerCommentSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = ('pk', 'user', 'content')
    comments = AnswerCommentSerializer(read_only=True, many=True)
    
    class Meta:
        model = Answer
        fields = ('pk', 'content', 'property', 'question', 'select_users', 'comments')