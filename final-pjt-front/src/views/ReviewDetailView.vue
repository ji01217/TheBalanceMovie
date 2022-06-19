<template>
  <div class="container review-detail my-3 p-3">
    <router-link
      :to="{ name: 'MovieDetail', params: { movieId: movie.id } }"
      class="review-detail-movie"
      >{{ movie.title }}
      <span class="year" v-if="movie.release_date"
        >({{ movieYear }})</span
      ></router-link
    >
    <hr class="hr" />
    <div class="review-detail-title">{{ review.title }}</div>
    <div class="review-writer">
      작성자:
      <router-link
        :to="{ name: 'profile', params: { username: review.user.username } }"
        class="review-link"
        >{{ review.user.username }}</router-link
      >
    </div>
    <p>
      {{ review.content }}
    </p>
    <div class="review-info">
      <div>작성: {{ createdAt }}</div>
      <div>수정: {{ updatedAt }}</div>
    </div>
    <div class="d-flex justify-content-center">
      <div v-if="isAuthor">
        <router-link
          :to="{
            name: 'ReviewEdit',
            params: { reviewPk, movieId: newreview.movieId },
          }"
        >
          <button class="btn btn-outline-dark btn-sm">리뷰 수정</button>
        </router-link>
        |
        <button
          @click="deleteReview(newreview)"
          class="btn btn-outline-dark btn-sm"
        >
          리뷰 삭제
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center my-1">
      <span @click="likeReview(reviewPk)" class="like-button mx-1"
        >{{ isReviewLike ? "추천 취소 " : "이 리뷰 추천하기 " }}👍🏻</span
      >{{ likeCount }}
    </div>
    <hr />
    <comment-list :comments="review.comments"></comment-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "ReviewDetail",
  components: { CommentList },
  data() {
    return {
      reviewPk: this.$route.params.reviewPk,
      movieId: this.$route.params.movieId,
      newreview: {
        reviewPk: this.$route.params.reviewPk,
        movieId: this.$route.params.movieId,
      },
    };
  },
  computed: {
    ...mapGetters(["isAuthor", "review", "movie", "currentUser"]),
    likeCount() {
      return this.review.like_users?.length;
    },
    movieYear() {
      return this.movie.release_date.slice(0, 4);
    },
    createdAt() {
      return (
        this.review.created_at.slice(0, 10) +
        " " +
        this.review.created_at.slice(11, 19)
      );
    },
    updatedAt() {
      return (
        this.review.updated_at.slice(0, 10) +
        " " +
        this.review.updated_at.slice(11, 19)
      );
    },
    isReviewLike() {
      const like = this.review.like_users;
      return like.includes(this.currentUser.pk);
    },
  },
  methods: {
    ...mapActions(["fetchReview", "likeReview", "deleteReview", "fetchMovie"]),
  },
  created() {
    this.fetchReview(this.reviewPk);
    this.fetchMovie(this.movieId);
  },
};
</script>

<style>
.review-detail {
  border: 1px solid #d0c9c0;
}
.review-detail-movie {
  font-size: 30px;
  font-family: "Happiness-Sans-Title";
  text-decoration: none;
  color: black;
}
.hr {
  margin-top: 2px;
}
.year {
  font-size: 12px;
}
.review-detail-title {
  font-size: 22px;
}
.review-link {
  text-decoration: none;
  color: black;
}
.review-info {
  text-align: right;
  font-size: 12px;
}
.review-writer {
  text-align: right;
  font-size: 18px;
}
.like-button:hover {
  cursor: pointer;
}
</style>
