<template>
  <div>
    <hr />
    <div class="review-list d-flex justify-content-between">
      <router-link
        :to="{
          name: 'ReviewDetail',
          params: { reviewPk: review.pk, movieId: review.movie },
        }"
        class="review-title mx-3"
      >
        {{ review.title }}
      </router-link>
      <div>
        {{ review.created_at.slice(0, 10) }} / 추천: {{ review.like_count }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewListItem",
  props: {
    review: Object,
  },
};
</script>

<style>
.review-title {
  text-decoration: none;
  color: black;
  font-size: 20px;
}
.review-list {
  display: inline-block;
}
</style>