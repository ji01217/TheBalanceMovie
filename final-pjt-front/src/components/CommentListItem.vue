<template>
  <div>
    <div class="comment-list-item d-flex justify-content-between">
      <li class="comment-num">
        <router-link
          :to="{
            name: 'profile',
            params: { username: comment.user.username },
          }"
          class="comment-user"
        >
          {{ comment.user.username }}
        </router-link>
        <div v-if="!isEditing">
          {{ payload.content }}
        </div>
        <div v-if="isEditing" class="input-group input-group-sm">
          <input type="text" v-model="payload.content" class="form-control" />
        </div>
      </li>
      <div class="mx-3 d-flex align-items-end">
        <div v-if="isEditing" class="input-group input-group-sm">
          <span @click="onUpdate" class="mx-1 mt-auto review-button">수정</span>
          <span class="mt-auto"> | </span>
          <span @click="switchIsEditing" class="ms-1 mt-auto review-button"
            >취소</span
          >
        </div>
        <span
          v-if="currentUser.username === comment.user.username && !isEditing"
        >
          <span @click="switchIsEditing" class="review-button"> 수정 </span>
          |
          <span @click="deleteComment(payload)" class="review-button">
            삭제
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommentListItem",
  props: { comment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        reviewPk: this.comment.review,
        commentPk: this.comment.pk,
        content: this.comment.content,
      },
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateComment", "deleteComment"]),
    switchIsEditing() {
      this.isEditing = !this.isEditing;
    },
    onUpdate() {
      this.updateComment(this.payload);
      this.isEditing = false;
    },
  },
};
</script>

<style>
.comment-list-item {
  display: inline-block;
}
.comment-user {
  text-decoration: none;
  color: black;
}
.comment-num {
  font-size: 14px;
}
.review-button:hover {
  cursor: pointer;
}
</style>