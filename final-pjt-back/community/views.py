from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from community.models import Question, Answer, Comment
from .serializers.answer import AnswerSerializer, QuestionListSerializer, QuestionSerializer
from .serializers.comment import AnswerCommentSerializer


# Create your views here.
@api_view(['GET'])
def question_detail(request, question_pk):
    question = get_object_or_404(Question, id=question_pk)
    serializer = QuestionSerializer(question)
    return Response(serializer.data)

@api_view(['GET','POST'])
def comment_list_create(request, answer_pk):
    user = request.user
    answer = get_object_or_404(Answer, id=answer_pk)
    
    def answer_detail():
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

    def create_comment():
        serializer = AnswerCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(answer=answer, user=user)

            # 기존 serializer 가 return 되면, 단일 comment 만 응답으로 받게됨.
            # 사용자가 댓글을 입력하는 사이에 업데이트된 comment 확인 불가 => 업데이트된 전체 목록 return 
            comments = answer.comments.all()
            serializer = AnswerCommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return answer_detail()
    elif request.method == 'POST':
        return create_comment()

@api_view(['PUT', 'DELETE'])
def comment_update_delete(request, answer_pk, comment_pk):
    answer = get_object_or_404(Answer, id=answer_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    def update_comment():
        if request.user == comment.user:
            serializer = AnswerCommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                comments = answer.comments.all()
                serializer = AnswerCommentSerializer(comments, many=True)
                return Response(serializer.data)

    def delete_comment():
        if request.user == comment.user:
            comment.delete()
            comments = answer.comments.all()
            serializer = AnswerCommentSerializer(comments, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_comment()
    elif request.method == 'DELETE':
        return delete_comment()

@api_view(['POST'])
def answer_create(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['GET'])
def question_list_random(request):
    questions = Question.objects.order_by('?')
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def question_list(request):
    questions = get_list_or_404(Question)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)