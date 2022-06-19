<template>
  <div class="container">
    <div class="row">
      <sidebar-header title="영화 랜덤 추천"></sidebar-header>
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
</template>

<script>
import MovieCardList from "@/components/MovieCardList.vue";
import SidebarHeader from "@/components/SidebarHeader.vue";
import SidebarRight from "@/components/SidebarRight.vue";
import SidebarLeft from "@/components/SidebarLeft.vue";
import { mapActions } from "vuex";

export default {
  name: "RandomMovie",
  components: {
    MovieCardList,
    SidebarHeader,
    SidebarRight,
    SidebarLeft,
  },
  methods: {
    ...mapActions(["fetchRandomMovies"]),
  },
  created() {
    this.fetchRandomMovies();
  },
};
</script>

<style>
</style>