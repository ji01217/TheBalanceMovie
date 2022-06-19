<template>
  <div>
    <div class="my-3 head d-flex justify-content-center">
      <h1>The</h1>
      &nbsp;&nbsp;&nbsp;
      <h1 style="color:red;">B</h1>
      <h1 style="color:orange;">A</h1>
      <h1 style="color:gold;">L</h1>
      <h1 style="color:green;">A</h1>
      <h1 style="color:blue;">N</h1>
      <h1 style="color:indigo;">C</h1>
      <h1 style="color:purple;">E</h1>
      &nbsp;&nbsp;&nbsp;
      <h1>Movie</h1>
    </div>
    <div
      id="carouselExampleControls"
      class="header carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <select-item
            :answer="answer1"
            class="answer-card1 card mx-1 my-2"
          ></select-item>
          vs
          <select-item
            :answer="answer2"
            class="answer-card2 card mx-1 my-2"
          ></select-item>
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
    <hr />
  </div>
</template>

<script>
import SelectItem from "@/components/SelectItem.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MovieHeader",
  components: {
    SelectItem,
  },
  computed: {
    ...mapGetters(["answer1", "answer2", "left", "right"]),
  },
  methods: {
    ...mapActions(["fetchRandomQuestions", "leftQuestion", "rightQuestion"]),
  },
  created() {
    this.fetchRandomQuestions();
  },
};
</script>

<style>
.header {
  text-align: center;
}
.head {
  font-family: 'IM_Hyemin-Bold';

}
.answer-card1 {
  font-family: 'IM_Hyemin-Bold';
  background-color: #222831;
  color: #fdf6f0;
}
.answer-card2 {
  font-family: 'IM_Hyemin-Bold';
  background-color: #EEEEEE;
  color: #222831;
  border: solid 2px #222831 ;
}
.card:hover {
  transform: scale(1.1);
  z-index: 2;
  cursor: pointer;
}
.card {
  width: 30%;
  height: 100px;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  height: 100px;
  width: 100px;
  outline: black;
  background-size: 100%, 100%;
  /* border-radius: 50%;
  border: 1px solid black; */
  background-image: none;
}

.carousel-control-next-icon:after {
  content: "»";
  font-size: 66px;
  color: black;
}

.carousel-control-prev-icon:after {
  content: "«";
  font-size: 66px;
  color: black;
}
</style>