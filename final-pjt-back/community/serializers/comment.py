from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Comment
# from .answer import AnswerSerializer

User = get_user_model()

class AnswerCommentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only=True)
    # answer = AnswerSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('pk', 'user', 'content', 'answer',)
        read_only_fields = ('answer', )