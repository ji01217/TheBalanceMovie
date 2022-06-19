<template>
  <li class="list-group-item answer-comment-list-item">
    <div class="comment-list-item d-flex justify-content-between">
      <div class="comment-list">
        <router-link
          :to="{ name: 'profile', params: { username: comment.user.username } }"
          class="comment-user"
        >
          {{ comment.user.username }}
        </router-link>
        <div v-if="!isEditing">{{ payload.content }}</div>
        <span v-if="isEditing" class="input-group input-group-sm">
          <input type="text" v-model="payload.content"
        /></span>
      </div>
      <div class="mx-3 d-flex align-items-end">
        <span v-if="isEditing" class="input-group input-group-sm">
          <span @click="onUpdate" class="mx-1 mt-auto review-button">수정</span>
          |
          <span @click="switchIsEditing" class="ms-1 me-3 mt-auto review-button"
            >취소</span
          >
        </span>

        <span
          v-if="currentUser.username === comment.user.username && !isEditing"
        >
          <span @click="switchIsEditing" class="review-button">수정</span> |
          <span @click="deleteAnswerComment(payload)" class="review-button me-3"
            >삭제</span
          >
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AnswerCommentListItem",
  props: {
    comment: Object,
    answer: Object,
  },
  data() {
    return {
      isEditing: false,
      payload: {
        answerId: this.answer.id,
        commentPk: this.comment.pk,
        content: this.comment.content,
      },
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateAnswerComment", "deleteAnswerComment"]),
    switchIsEditing() {
      this.isEditing = !this.isEditing;
    },
    onUpdate() {
      this.updateAnswerComment(this.payload);
      this.isEditing = false;
    },
  },
};
</script>

<style>
.answer-comment-list-item {
  background: #fdf6f0;
  border: solid 1px rgb(8, 116, 8);
}
.comment-list {
  display: inline-block;
}
</style>