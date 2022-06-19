<template>
  <div class="container mx-auto mt-3">
    <div class="admin-title">관리자 모드</div>
    <hr />
    <h3>영화 정보를 수정하세요</h3>
    <admin-movie-create-form v-if="IsMovie" :adminmovie="movie" action="update">
    </admin-movie-create-form>
  </div>
</template>

<script>
import AdminMovieCreateForm from "@/components/AdminMovieCreateForm.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AdmitMovieEdit",
  components: { AdminMovieCreateForm },
  computed: {
    ...mapGetters(["movie", "IsMovie"]),
  },
  methods: {
    ...mapActions(["fetchMovie"]),
  },
  created() {
    this.fetchMovie(this.$route.params.movieId);
  },
};
</script>

<style></style>
