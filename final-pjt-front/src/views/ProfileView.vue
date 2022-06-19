<template>
  <div class="container profile-card">
    <div class="profile-title mt-3 ms-3">" {{ profile.username }} " 님의 프로필</div>
    <hr />
    <div class="profile-title">관심 영화 목록</div>
    <movie-card-list></movie-card-list>
    <hr />
    <div class="profile-title">작성한 영화 리뷰</div>
    <div v-if="profile.reviews">
      <div v-for="review in profile.reviews" :key="review.pk">
        <hr class="profile-hr" />
        <div class="review-list d-flex justify-content-between">
          <router-link
            :to="{
              name: 'ReviewDetail',
              params: { reviewPk: review.id, movieId: review.movie },
            }"
            class="ms-3 profile-review-title"
          >
            {{ review.title }}
          </router-link>
          <div class="me-3">
            {{ review.created_at.slice(0, 10) }} / 추천:
            {{ review.like_users.length }}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="profile-title">작성한 댓글</div>
    <div>
      <div v-for="comment in profile.comments" :key="comment.pk">
        <hr class="m-1" />
        <div class="review-list d-flex justify-content-between">
          <router-link
            :to="{
              name: 'ReviewDetail',
              params: {
                reviewPk: comment.review.id,
                movieId: comment.review.movie,
              },
            }"
            class="profile-review-title"
          >
            <div class="ms-3">{{ comment.review.title }}</div>
            <div class="ms-3">↳ {{ comment.content }}</div>
          </router-link>
          <div class="my-auto me-3">
            {{ comment.review.created_at.slice(0, 10) }} / 추천:
            {{ comment.review.like_users.length }}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="profile-title">
      선택한 밸런스 질문
      <router-link class="btn btn-outline-dark btn-sm mx-3"
        :to="{ name: 'Community' }"
        >Community</router-link>
    </div>
    <div>
      <div v-for="answer in profile.select_answers" :key="answer.pk">
        <hr />
        <div>{{ questions[answer.question - 1].title }}</div>
        <div class="my-select">나의 선택 "{{ answer.content }}"</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieCardList from "@/components/MovieCardList.vue";
export default {
  name: "ProfileView",
  components: {
    MovieCardList,
  },
  computed: {
    ...mapGetters(["profile", "questions"]),
  },
  methods: {
    ...mapActions(["fetchProfile", "fetchQuestions"]),
  },
  created() {
    const payload = { username: this.$route.params.username };
    this.fetchProfile(payload);
    this.fetchQuestions();
  },
};
</script>

<style>
.profile-card {
  border: 3px solid #decab1;
  border-radius: 30px;
  margin-top: 55px;
  padding: 20px;
  width: 55%;
  box-shadow: 5px 5px 5px 5px gray;
}
.profile-title {
  font-size: 30px;
  font-family: "Happiness-Sans-Title";
}
.profile-review-title {
  text-decoration: none;
  color: #334257;
}
.my-select {
  font-weight: bold;
}
</style>