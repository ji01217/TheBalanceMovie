<template>
  <div v-if="IsMovie" class="container">
    <div class="row my-5">
      <div class="col-8">
        <h1>
          {{ movie.title }}
          <span class="star-ratings">
            <span
              class="star-ratings-fill space-x-2 text-lg"
              :style="{ width: ratingToPercent + '%' }"
            >
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </span>
            <span class="star-ratings-base space-x-2 text-lg">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </span>  </span>
          <span class="date">({{ movie.vote_average }})</span>
            <span> </span>
          <div
            v-if="currentUser.username==='admin'">
            <router-link
              :to="{ name: 'AdminMovieEdit', params: { movieId } }"
              class="btn btn-info"
            >
              영화 수정하기 (관리자용)
            </router-link>
            |
            <button 
              @click="adminDeleteMovie(movieId)"
              class="btn btn-danger"
              >영화 삭제하기 (관리자용)</button>
          </div>

        </h1>
        <div>{{ movie.release_date }} 개봉</div>
        <p>{{ movie.overview }}</p>
        <div>
          <span @click="likeMovie(movieId)" class="button">
            {{ isMovieLike ? "💗" : "🤍" }}
          </span>
          {{ likeCount }} likes
        </div>
        <div>
          출연:
          <span v-for="actor in movie.actors" :key="actor.id"
            >{{ actor.name }}, </span
          >...
        </div>
        <div>
          제작사:
          <span v-for="company in movie.company" :key="company.id"
            >{{ company.company }}, </span
          >...
        </div>
        <div>
          장르:
          <span v-for="genre in movie.genres" :key="genre.id"
            >{{ genre.name }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <img :src="moviePosterPath" alt="img" class="cardimg" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="area">
          <iframe class="video" :src="movieYoutube" frameborder="0"></iframe>
        </div>
      </div>
      <div class="col-6">
        <div class="review">
          <span>영화 리뷰</span>
          <router-link :to="{ name: 'ReviewNew', params: { movieId } }"
            ><button
              class="review-btn btn btn-outline-dark btn-sm align-items-center"
            >
              리뷰쓰기
            </button></router-link
          >
        </div>
        <review-list></review-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ReviewList from "@/components/ReviewList.vue";
export default {
  name: "MovieDetail",
  data() {
    return {
      movieId: this.$route.params.movieId,
    };
  },
  components: {
    ReviewList,
    // ReviewForm,
  },
  computed: {
    ...mapGetters(["movie", "IsMovie", "currentUser"]),
    likeCount() {
      return this.movie.like_users?.length;
    },
    moviePosterPath() {
      const path = this.movie.poster_path;
      return "https://www.themoviedb.org/t/p/original/" + path;
    },
    movieYoutube() {
      const youtubekey = this.movie.youtube_key;
      return "https://www.youtube.com/embed/" + youtubekey;
    },
    ratingToPercent() {
      return this.movie.vote_average * 10;
    },
    isMovieLike() {
      const like = this.movie.like_users;
      return like.includes(this.currentUser.pk);
    },
  },
  methods: {
    ...mapActions(["fetchMovie", "likeMovie", "fetchReviews", "adminDeleteMovie"]),
  },
  created() {
    this.fetchMovie(this.movieId);
    this.fetchReviews(this.movieId);
  },
};
</script>

<style>
.date {
  font-size: 14px;
}
.cardimg {
  width: 300px;
  border-radius: 5%;
}
.star-ratings {
  font-size: 20px;
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
.star-ratings-fill {
  font-size: 20px;
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
.star-ratings-base {
  z-index: 2;
  padding: 0;
}
.button:hover {
  cursor: pointer;
}
.review {
  position: relative;
  text-align: center;
  font-size: 30px;
}
.review-btn {
  position: absolute;
  right: 10%;
  bottom: 5%;
  font-size: 16px;
}
.area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
.video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
  border-radius: 5%;
}
</style>