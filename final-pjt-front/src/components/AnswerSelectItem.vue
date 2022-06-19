<template>
  <div class="answer-card result-card card">
    <p>{{ answer.content.slice(0,9) }}</p>
    <p v-if="answer.select_users">
      {{ Math.ceil((answer.select_users.length / total) * 100) }}%
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AnswerSelectItem",
  props: {
    answer: Object,
    total: Number,
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
.result-card {
  font-size: 18px;
  line-height: 40px;
  
}
</style>