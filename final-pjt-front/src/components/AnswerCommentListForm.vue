<template>
  <form
    @submit.prevent="onSubmit"
    class="answer-comment-list-form input-group d-flex"
  >
    <input
      type="text"
      id="comment"
      v-model="content"
      class="form-control my-input"
      placeholder="댓글 입력"
      aria-describedby="button-addon2"
      required
    />
    <button
      @click="onSubmit"
      class="btn btn-outline-secondary btn-sm"
      type="button"
      id="button-addon2"
    >
      Comment
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AnswerCommentListForm",
  props: {
    answer: Object,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    ...mapActions(["createAnswerComment"]),
    onSubmit() {
      this.createAnswerComment({
        answerId: this.answer.id,
        content: this.content,
      });
      this.content = "";
    },
  },
};
</script>

<style>
.answer-comment-list-form {
  margin: 10px auto;
  display: inline-block;
  width: 98%;
}
</style>