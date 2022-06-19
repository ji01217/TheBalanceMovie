<template>
  <div class="container">
    <div class="row">
      <sidebar-header title="관심 영화"></sidebar-header>
    </div>
    <div class="row">
      <div class="col-2">
        <sidebar-left></sidebar-left>
      </div>
      <div class="col-8">
        <movie-card-list></movie-card-list>
        <div class="blank"></div>
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
  name: "CollectionMovie",
  components: {
    MovieCardList,
    SidebarHeader,
    SidebarRight,
    SidebarLeft,
  },
  methods: {
    ...mapActions(["fetchCollectionMovies"]),
  },
  created() {
    const user = this.$route.params.username;
    this.fetchCollectionMovies(user);
  },
};
</script>

<style>
</style>