<template>
  <div class="d-flex-row sideleft">
    <div class="my-1">
      <router-link :to="{ name: 'RecentMovie' }" class="link"
        >Recent</router-link
      >
    </div>
    <div class="my-1">
      <router-link :to="{ name: 'PopularMovie' }" class="link"
        >Popular</router-link
      >
    </div>
    <div class="my-1">
      <router-link :to="{ name: 'RandomMovie' }" class="link"
        >Random</router-link
      >
    </div>
    <div v-if="isLoggedIn" class="my-1">
      <router-link
        :to="{ name: 'CollectionMovie', params: { username } }"
        class="link"
        >Collection</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidebarLeft",
  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),
    username() {
      return this.currentUser.username ? this.currentUser.username : "guest";
    },
  },
};
</script>

<style>
.sideleft {
  position: sticky;
  top: 100px
  
}
.link {
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-family: 'IM_Hyemin-Bold';

}

</style>