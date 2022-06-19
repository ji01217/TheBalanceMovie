<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title" class="form-label">리뷰 제목</label>
      <div>
        <input
          v-model="newReview.title"
          id="title"
          type="text"
          class="form-control"
          placeholder="영화 한줄평"
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">상세 내용</label>
      <div>
        <textarea
          v-model="newReview.content"
          type="text"
          id="content"
          class="form-control"
          rows="5"
        ></textarea>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-dark">{{ action }}</button>
    </div>
    <div class="blank"></div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ReviewForm",
  props: {
    review: Object,
    action: String,
  },
  data() {
    return {
      newReview: {
        title: this.review.title,
        content: this.review.content,
        movieId: this.$route.params.movieId,
      },
    };
  },

  methods: {
    ...mapActions(["createReview", "updateReview"]),

    onSubmit() {
      if (this.action === "리뷰쓰기") {
        this.createReview(this.newReview);
      } else if (this.action === "리뷰수정") {
        const payload = {
          reviewPk: this.review.id,
          ...this.newReview,
        };
        console.log(payload);
        this.updateReview(payload);
      }
    },
  },
};
</script>

<style>
.blank {
  height: 540px;
}
</style>