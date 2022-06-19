<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { NavBar },
  methods: {
    ...mapActions(["fetchCurrentUser"]),
  },
  created() {
    this.fetchCurrentUser();
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  /* background-color: #fdf6f0; */
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
</style>
