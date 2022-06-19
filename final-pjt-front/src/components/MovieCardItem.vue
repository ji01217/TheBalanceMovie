<template>
  <div class="d-flex justify-content-center">
    <div class='my-3'>
      <router-link
        :to="{ name: 'MovieDetail', params: { movieId: movie.id } }"
        class="link"
      >
        <img :src="moviePosterPath" alt="img" class="img img-fluid" />
        <div class="d-flex my-1">
          <div class="link-text flex-grow-1">{{ movie.title }}</div>
          <div class="like">{{ isMovieLike ? "💗" : "🤍"}}</div>
          <div class="like">{{ movie.like_count }}</div>
        </div>
        </router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MovieCardItem",
  props: {
    movie: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    moviePosterPath() {
      const path = this.movie.poster_path;
      return "https://www.themoviedb.org/t/p/original/" + path;
    },
    isMovieLike() {
      const like = this.movie.like_users;
      return like.includes(this.currentUser.pk);
    },
  },
};
</script>

<style>
.img {
  width: 200px;
  height: 180px;
  border-radius: 5%;
  box-shadow: 2px 2px 2px 2px gray;
}
.like {
  font-size: 12px;
}

.link {
  text-decoration: none;
  color: black;
  
}
.link-text {
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-weight: 700;
}
</style>