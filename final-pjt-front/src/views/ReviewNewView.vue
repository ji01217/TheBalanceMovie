<template>
  <div class="container">
    <div class="review-create-movie my-3">"{{ movie.title }}" 리뷰 작성</div>
    <hr />
    <review-form :review="review" action="리뷰쓰기"></review-form>
  </div>
</template>

<script>
import ReviewForm from "@/components/ReviewForm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ReviewNew",
  components: {
    ReviewForm,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      review: {
        pk: null,
        movieId: this.movieId,
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters(["movie"]),
  },
  methods: {
    ...mapActions(["fetchMovie"]),
  },
  created() {
    this.fetchMovie(this.movieId);
  },
};
</script>

<style>
.review-create-movie {
  font-family: "Happiness-Sans-Title";
  font-size: 30px;
}
</style>