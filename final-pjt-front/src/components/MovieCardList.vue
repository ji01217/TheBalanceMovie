<template>
  <div class="my-3 recenttop">
    <div v-if="!movies" class="select-movie">나의 영화 취향은...</div>
    <div v-if="movies" class="row">
      <movie-card-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        class="col-lg-3 col-md-4 col-sm-6 col-12"
      ></movie-card-item>
    </div>
  </div>
</template>

<script>
import MovieCardItem from "@/components/MovieCardItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "MovieCardList",
  components: {
    MovieCardItem,
  },
  computed: {
    ...mapGetters(["movies"]),
  },
};
</script>

<style>
.select-movie {
  font-family: "IM_Hyemin-Bold";
  height: 1000px;
  font-size: 30px;
  text-align: center;
  margin-top: 5px;
}
</style>