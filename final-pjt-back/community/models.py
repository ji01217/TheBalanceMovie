from django.db import models
from django.conf import settings


class Question(models.Model):
    title = models.CharField(max_length=100)
    field = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='answer')
    content = models.CharField(max_length=100)
    property = models.CharField(max_length=200)
    select_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='select_answers')

    def __str__(self):
        return self.content

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='question_comments')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
