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
        <img src="../assets/community1.png" class="d-block w-100 bg-dark movieimage" alt="movie1">
        <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
          <h2>커뮤니티에서 밸런스 게임 결과를 확인할 수 있어요!</h2>
          <h2>다른 사람들은 어떤 영화를 선택했을까요?</h2>
        </div>

      </div>
      <div class="carousel-item">
        <img src="../assets/community2.png" class="d-block w-100 bg-dark movieimage" alt="movie2">
        <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
          <h2>“이 영화가 더 재밌어!”</h2>
          <h2>내가 선택한 영화에 댓글을 마음껏 남겨주세요!</h2>
        </div>
        
      </div>
      <div class="carousel-item">
        <img src="../assets/community3.png" class="d-block w-100 bg-dark movieimage" alt="movie3">
        <div class="carousel-caption d-none d-md-block moviecaption" style="color: white;">
          <h2>댓글을 남길 땐</h2>
          <h2>다른 유저를 배려해주세요</h2>
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
  
  <div class="container">
    <div class="row">
      <community-header></community-header>
    </div>
    <hr />
    <div class="row">
      <div class="col-2">
        <sidebar-left></sidebar-left>
      </div>
      <div class="col-8">
        <answer-comment-list v-if="onresult"></answer-comment-list>
      </div>
      <div class="col-2">
        <sidebar-right></sidebar-right>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import AnswerCommentList from "@/components/AnswerCommentList.vue";
import CommunityHeader from "@/components/CommunityHeader.vue";
import SidebarRight from "@/components/SidebarRight.vue";
import SidebarLeft from "@/components/SidebarLeft.vue";
import { mapGetters } from "vuex";

export default {
  name: "CommunityView",
  components: {
    AnswerCommentList,
    CommunityHeader,
    SidebarRight,
    SidebarLeft,
  },
  computed: {
    ...mapGetters(["onresult"]),
  },
};
</script>

<style>
</style>