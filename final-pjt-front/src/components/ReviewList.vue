<template>
  <div>
    <review-list-item
      v-for="review in reviews"
      :key="review.pk"
      :review="review"
    ></review-list-item>
    <hr />
  </div>
</template>

<script>
import ReviewListItem from "@/components/ReviewListItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "ReviewList",
  components: {
    ReviewListItem,
  },
  computed: {
    ...mapGetters(["reviews"]),
  },
};
</script>

<style>
</style>