<template>
  <div class="header">
    <div class="my-3 head d-flex justify-content-center">
      <h1 style="color:red;">B</h1>
      <h1 style="color:orange;">A</h1>
      <h1 style="color:gold;">L</h1>
      <h1 style="color:green;">A</h1>
      <h1 style="color:blue;">N</h1>
      <h1 style="color:indigo;">C</h1>
      <h1 style="color:purple;">E</h1>
      &nbsp;&nbsp;&nbsp;
      <h1>Coummunity</h1>
    </div>
    <!-- <div class="community-title">Community</div> -->
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active d-flex justify-content-center">
          <div @click="onResultOpen" class="card community-card mb-3">
            <div class="card-text">
              {{ answer1.content.slice(0,9) }} vs {{ answer2.content.slice(0,9) }}
            </div>
            <div class="result">결과보기</div>
          </div>
        </div>
      </div>
      <button
        v-show="left"
        @click="leftQuestion"
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        v-show="right"
        @click="rightQuestion"
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="container">
      <div v-if="onresult">
        <answer-select-item
          :answer="answer1"
          :total="total"
          class="answer-card1 mx-1"
        ></answer-select-item>
        vs
        <answer-select-item
          :answer="answer2"
          :total="total"
          class="answer-card2 mx-1"
        ></answer-select-item>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerSelectItem from "@/components/AnswerSelectItem.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommunityHeader",
  components: {
    AnswerSelectItem,
  },
  computed: {
    ...mapGetters(["answer1", "answer2", "left", "right", "total", "onresult"]),
  },
  methods: {
    ...mapActions([
      "fetchRandomQuestions",
      "leftQuestion",
      "rightQuestion",
      "fetchTotal",
    ]),
    onResultOpen() {
      const total =
        this.answer1.select_users.length + this.answer2.select_users.length;
      this.fetchTotal(total);
    },
  },
  created() {
    this.fetchRandomQuestions();
  },
};
</script>

<style>
.community-title {
  font-size: 50px;
  font-family: "Happiness-Sans-Title";
  text-align: center;
}
.community-card {
  width: 60%;
  height: 90px;
  line-height: 45px;
  background-color: #5b6268;
  color: white;
}
.card-text {
  font-size: 20px;
}
.result {
  font-size: 30px;
}
</style>