<template>
  <div class="container mx-auto mt-3 admin-card">
    <div class="admin-title">관리자모드</div>
    <hr />
    <h3>추가하고 싶은 영화를 입력하세요</h3>
    <admin-movie-create-form
      :adminmovie="adminmovie"
      action="create"
    ></admin-movie-create-form>
  </div>
</template>

<script>
import AdminMovieCreateForm from "@/components/AdminMovieCreateForm.vue";
export default {
  name: "AdminMovieCreate",
  components: { AdminMovieCreateForm },
  data() {
    return {
      adminmovie: {
        id: null,
        title: "",
        release_date: null,
        popularity: null,
        vote_count: null,
        vote_average: null,
        overview: "",
        poster_path: "",
        adult: false,
        youtube_key: "",
      },
    };
  },
};
</script>

<style>
.admin-title {
  font-family: "Happiness-Sans-Title";
  font-size: 40px;
}
.admin-card {
  width: 45%;
}
</style>