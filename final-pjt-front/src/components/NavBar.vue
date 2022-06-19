<template>

  <nav class="mynavbar navbar navbar-expand-lg navbar-dark d-flex">
    <div class="container-fluid navbartop">
      <router-link :to="{ name: 'Movie' }" class="navbar-brand">
        🎬 The Balance Movie</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Movie' }"
              class="nav-link active"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Community' }"
              class="nav-link"
              aria-current="page"
              >Community</router-link
            >
          </li>

          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link"
              >Login</router-link
            >
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'signup' }" class="nav-link"
              >Signup</router-link
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link
              :to="{ name: 'profile', params: { username } }"
              class="nav-link"
            >
              Mypage
            </router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'logout' }" class="nav-link"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),
    username() {
      return this.currentUser.username ? this.currentUser.username : "guest";
    },
  },
};
</script>

<style>
.mynavbar {
  position: sticky;
  top: 0;
  background-color: #222831;
  z-index: 100;
}
</style>