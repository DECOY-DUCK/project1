<template>
  <section class="accounts" id="login">
    <div class="accounts__container">
      <header class="accounts__header">
        <h2>Login</h2>
        <p>Welcome back!</p>
      </header>
      <form class="accounts__form" @submit="onSubmit">
        <input type="hidden" name="act" value="login" />
        <div class="accounts__form__item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            class="form__item__input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="accounts__form__item">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            class="form__item__input"
            placeholder="Enter your password"
            @blur="check"
            required
          />
        </div>
        <div v-if="show">
          <span>이메일 과 비밀번호를 다시 확인해주세요 </span>
        </div>
        <router-link to="./findPwd" class="accounts__link">
          Forgot your password?
        </router-link>
        <form-button type="submit" title="Login" />
      </form>
      Don't have an account?
      <router-link class="accounts__link" :to="{ name: 'SignUp' }">
        Sign up
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormButton from "@/components/buttons/FormButton.vue";

const accountsStore = "accountsStore";

export default {
  components: { FormButton },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      checkblank: false,
      show: false,
    };
  },
  computed: {
    ...mapState(accountsStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(accountsStore, ["asyncGetLogin", "asyncGetUserInfo"]),
    async onSubmit(e) {
      e.preventDefault();

      if (this.checkblank) {
        console.log(this.user);
        await this.asyncGetLogin(this.user);
        let token = sessionStorage.getItem("access-token");
        if (this.isLogin) {
          await this.asyncGetUserInfo(token);
          this.$router.push({ name: "Home" });
        } else {
          console.log("로그인 실패 동작확인");
          this.show = true;
        }
      } else {
        this.show = true;
      }
    },
    check: function () {
      if (this.user.email !== null && this.user.password !== null) {
        return (this.checkblank = true);
      }
    },
  },
  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
span {
  color: tomato;
}
</style>
