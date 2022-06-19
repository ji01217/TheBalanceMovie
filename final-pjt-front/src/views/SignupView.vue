<template>
  <div class="text-center">
    <h1 class="mt-5">회원가입을 위해</h1>
    <h1 class="mb-5">아래의 내용을 입력해주세요</h1>

    <account-error-list v-if="authError"></account-error-list>

    <form @submit.prevent="signup(credentials)">
      <div class="my-3">
        <label for="username">사용할 아이디 : </label>
        &nbsp;
        <input
          v-model="credentials.username"
          type="text"
          id="username"
          required
        />
      </div>
      <div  class="my-3">
        <label for="password1">비밀번호 : </label>
        &nbsp;
        <input
          v-model="credentials.password1"
          type="password"
          id="password1"
          required
        />
      </div>
      <div  class="my-3">
        <label for="password2">비밀번호 확인 :</label>
        &nbsp;
        <input
          v-model="credentials.password2"
          type="password"
          id="password2"
          required
        />
      </div>
      <div>
        <button>회원가입 하기</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AccountErrorList from "@/components/AccountErrorList.vue";

export default {
  name: "SignupView",
  components: {
    AccountErrorList,
  },
  data() {
    return {
      credentials: {
        username: "",
        password1: "",
        password2: "",
      },
    };
  },
  computed: {
    ...mapGetters(["authError"]),
  },
  methods: {
    ...mapActions(["signup"]),
  },
};
</script>

<style></style>
