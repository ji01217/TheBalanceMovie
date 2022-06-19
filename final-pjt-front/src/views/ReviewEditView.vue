<template>
  <div class="container">
    <div class="review-create-movie my-3">리뷰 수정</div>
    <hr />
    <review-form v-if="isReview" :review="review" action="리뷰수정">
    </review-form>
  </div>
</template>

<script>
import ReviewForm from "@/components/ReviewForm.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ReviewEditView",
  components: { ReviewForm },
  computed: {
    ...mapGetters(["review", "isReview", "reviews"]),
  },
  methods: {
    ...mapActions(["fetchReview"]),
  },
  created() {
    this.fetchReview(this.$route.params.reviewPk);
  },
};
</script>

<style></style>
