<template>
  <div class="container">
    <div class="row d-flex justify-content-center text-center">
      <h1 class="my-5">안녕하세요</h1>

      <account-error-list v-if="authError"></account-error-list>

      <form @submit.prevent="login(credentials)">
        <div class="my-3">
          <label for="username">아이디 : </label>
          &nbsp;
          <input
            v-model="credentials.username"
            type="text"
            id="username"
            required
          />
        </div>

        <div class="my-3">
          <label for="password">비밀번호 : </label>
          &nbsp;
          <input
            v-model="credentials.password"
            type="password"
            id="password"
            required
          />
        </div>

        <button>로그인 하기</button>
        <br>
        <br>
        <p>※ 회원이 아니시면 우상단 회원가입 클릭해주세요.※</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AccountErrorList from "@/components/AccountErrorList.vue";

export default {
  name: "LoginView",
  components: {
    AccountErrorList,
  },
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["authError"]),
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style></style>