<template>
  <div class="sidebar">
    <h4 class="my-0 sidebar-title">나의 프로필</h4>
    <br>
    <div class="idinfo">
      <div>ID: {{ currentUser.username }}</div>
      <div v-if="currentUser.email">email: {{ currentUser.email }}</div>
      <div v-if="currentUser.first_name">이름: {{ currentUser.first_name }}</div>
    </div>
    <div class="mypage-logout">
      <router-link
        :to="{ name: 'profile', params: { username: currentUser.username } }"
        v-if="currentUser.username"
        class="link"
      >
        Mypage
      </router-link>
      
      
      <!-- <router-link :to="{ name: 'logout' }" class="link">Logout</router-link> -->
    </div>
    
    <br><hr>
    <div>
      <router-link
        v-if="currentUser.username==='admin'"
        :to="{ name: 'AdminMovieCreate' }"
        class="btn btn-warning"
      >
        영화 추가 
        (관리자용)
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidebarRight",
  computed: {
    ...mapGetters(["currentUser", "isLoggedIn"]),
  },
};
</script>

<style>
.sidebar {
  text-align: center;
  position: sticky;
  top: 100px
}
.mypage-logout {
  display: inline-block;
}
.link {
  text-decoration: none;
  color: black;
}
.sidebar-title {
  font-family: 'IM_Hyemin-Bold';
  color: #73777b;
}
.idinfo {
  font-family: 'IM_Hyemin-Bold';
}
</style>