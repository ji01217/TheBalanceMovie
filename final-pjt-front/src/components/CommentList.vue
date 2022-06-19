<template>
  <div>
    <ol class="mx-3">
      <comment-list-item
        v-for="comment in comments"
        :comment="comment"
        :key="comment.pk"
      >
      </comment-list-item>
    </ol>
    <comment-list-form></comment-list-form>
  </div>
</template>

<script>
import CommentListItem from "@/components/CommentListItem.vue";
import CommentListForm from "@/components/CommentListForm.vue";

export default {
  name: "CommentList",
  components: { CommentListForm, CommentListItem },
  props: { comments: Array },
};
</script>

<style>
</style>