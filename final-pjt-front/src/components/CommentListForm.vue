<template>
  <form @submit.prevent="onSubmit" class="comment-list-form input-group d-flex">
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommentListForm",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapGetters(["review"]),
  },
  methods: {
    ...mapActions(["createComment"]),
    onSubmit() {
      this.createComment({ reviewPk: this.review.id, content: this.content });
      this.content = "";
    },
  },
};
</script>

<style>
.comment-list-form {
  margin: 1rem auto;
  display: inline-block;
  width: 98%;
}
.my-input {
  width: 100%;
}
</style>