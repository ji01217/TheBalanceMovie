<template>
  <div class="answer-comment-list container">
    <div class="community-text community-text-header my-3">다양한 의견을 남겨주세요!</div>
    <div class="row">
      <div class="col-6">
        <div class="commuity-comment-card">
          <div class="community-text my-3">{{ answer1.content }}</div>
          <ul class="list-group list-group-flush">
            <answer-comment-list-item
              v-for="comment in answer1.comments"
              :comment="comment"
              :key="comment.pk"
              :answer="answer1"
            >
            </answer-comment-list-item>
          </ul>
          <answer-comment-list-form
            :answer="answer1"
          ></answer-comment-list-form>
        </div>
      </div>
      <div class="col-6">
        <div class="commuity-comment-card">
          <div class="community-text my-3">{{ answer2.content }}</div>
          <ul class="list-group list-group-flush">
            <answer-comment-list-item
              v-for="comment in answer2.comments"
              :comment="comment"
              :key="comment.pk"
              :answer="answer2"
            >
            </answer-comment-list-item>
          </ul>
          <answer-comment-list-form
            :answer="answer2"
          ></answer-comment-list-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerCommentListItem from "@/components/AnswerCommentListItem.vue";
import AnswerCommentListForm from "@/components/AnswerCommentListForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "AnswerCommentList",
  components: { AnswerCommentListForm, AnswerCommentListItem },
  computed: {
    ...mapGetters(["answer1", "answer2"]),
  },
};
</script>

<style>

.community-text {
  text-align: center;
  
}
.commuity-comment-card {
  border: 2px solid #5F7161;
  border-radius: 5%;
  margin-top: 5px;
}
.community-text-header {
  font-family: 'IM_Hyemin-Bold';

}
</style>