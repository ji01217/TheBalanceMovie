<template>
  <div class="answer-card">
    <div v-if="answer1" @click="fetchSelectMovies(answer.id)" class="text">
      {{ answer.content }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectItem",
  props: {
    answer: Object,
  },
  computed: {
    ...mapGetters(["answer1"]),
  },
  methods: {
    ...mapActions(["fetchSelectMovies"]),
  },
};
</script>

<style>
.answer-card {
  width: 300px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
  align-items: center;
}
.text {
  line-height: 100px;
}
</style>