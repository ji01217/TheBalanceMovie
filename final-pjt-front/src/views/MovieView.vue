<template>
  <div>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/movie1.jpg" class="d-block w-100 bg-dark movieimage" alt="movie1">
          <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
            <h2>내가 좋아하는 영화와</h2>
            <h2>비슷한 영화를 추천!</h2>
          </div>

        </div>
        <div class="carousel-item">
          <img src="../assets/movie2.png" class="d-block w-100 bg-dark movieimage" alt="movie2">
          <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
            <h2>최신 영화와 요즘 인기 영화 모아보기!</h2>
            <h2>그래도 못 고르겠다면 영화 랜덤 추천 기능을 이용해보세요</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/movie3.png" class="d-block w-100 bg-dark movieimage" alt="movie3">
          <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
            <h2>영화 리뷰 게시판에서 다른 사람들과 후기를 공유해보세요.</h2>
            <h2>공감되는 리뷰에는 추천 꾹!</h2>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- <div class="cropped">
      <img
        src="../assets/movie1.jpg"
        alt=""
      />
    </div> -->

    <div class="container">
      <div class="row">
        <movie-header></movie-header>
      </div>
      <div class="row">
        <div class="col-2">
          <sidebar-left></sidebar-left>
        </div>
        <div class="col-8">
          <movie-card-list></movie-card-list>
        </div>
        <div class="col-2">
          <sidebar-right></sidebar-right>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardList from "@/components/MovieCardList.vue";
import MovieHeader from "@/components/MovieHeader.vue";
import SidebarRight from "@/components/SidebarRight.vue";
import SidebarLeft from "@/components/SidebarLeft.vue";

export default {
  name: "MovieView",
  components: {
    MovieCardList,
    MovieHeader,
    SidebarRight,
    SidebarLeft,
  },
};
</script>

<style>
.movieimage {
  height: 300px;
 
}
.moviecaption {
  margin-bottom: 50px;
  font-family: "Happiness-Sans-Title";
}
</style>