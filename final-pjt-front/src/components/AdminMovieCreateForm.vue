<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="id">id </label>
      <input
        type="number"
        id="id"
        v-model="newMovie.id"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="title">Title </label>
      <input
        type="text"
        id="title"
        v-model="newMovie.title"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="release_date">Release_date </label>
      <input
        type="date"
        id="release_date"
        v-model="newMovie.release_date"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="popularity">Popularity </label>
      <input
        type="number"
        step="any"
        id="popularity"
        v-model="newMovie.popularity"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="vote_count">vote_count </label>
      <input
        type="number"
        id="vote_count"
        v-model="newMovie.vote_count"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="vote_average">vote_average </label>
      <input
        type="number"
        step="any"
        id="vote_average"
        v-model="newMovie.vote_average"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="overview">overview </label>
      <div>
        <textarea
          v-model="newMovie.overview"
          id="overview"
          cols="70"
          rows="3"
          class="mt-1 form-control"
        ></textarea>
      </div>
    </div>
    <div class="mt-3">
      <label for="poster_path">poster_path </label>
      <input
        type="text"
        id="poster_path"
        v-model="newMovie.poster_path"
        class="mt-1 form-control"
      /><br />
    </div>
    <div>
      <label for="adult">adult </label>
      <input
        type="checkbox"
        id="adult"
        v-model="newMovie.adult"
        class="mt-1 ms-3 form-check-input"
      /><br />
    </div>
    <div class="mt-3">
      <label for="youtube_key">youtube_key </label>
      <input
        type="text"
        id="youtube_key"
        v-model="newMovie.youtube_key"
        class="mt-1 form-control"
      /><br />
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-dark my-3">{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AdminMovieCreateForm",
  props: {
    adminmovie: Object,
    action: String,
  },
  data() {
    return {
      newMovie: {
        id: this.adminmovie.id,
        title: this.adminmovie.title,
        release_date: this.adminmovie.release_date,
        popularity: this.adminmovie.popularity,
        vote_count: this.adminmovie.vote_count,
        vote_average: this.adminmovie.vote_average,
        overview: this.adminmovie.overview,
        poster_path: this.adminmovie.poster_path,
        adult: this.adminmovie.adult,
        youtube_key: this.adminmovie.youtube_key,
      },
    };
  },

  methods: {
    ...mapActions(["adminCreateMovie", "adminUpdateMovie"]),
    onSubmit() {
      if (this.action === "create") {
        this.adminCreateMovie(this.newMovie);
      } else if (this.action === "update") {
        const changemovie = {
          id: this.adminmovie.id,
          ...this.newMovie,
        };
        this.adminUpdateMovie(changemovie);
      }
    },
  },
};
</script>

<style></style>
