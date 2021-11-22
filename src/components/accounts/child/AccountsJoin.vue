<template>
  <section class="accounts" id="signup">
    <div class="accounts__container">
      <header class="accounts__header">
        <h2>Sign up</h2>
        <p>Welcome!</p>
      </header>
      <form class="" method="post" id="userform">
        <input type="hidden" name="act" value="join" />
        <div class="accounts__form__item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="form__item__input"
            placeholder="Enter your email"
          />
        </div>
        <div id="emailCheck" class="accounts__emailCheck__result hide"></div>
        <div class="accounts__form__item">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form__item__input"
            placeholder="Enter your password"
            @blur="checkpwd"
          />
        </div>
        <div class="accounts__form__item">
          <label for="password2">Confirm password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            v-model="password2"
            class="form__item__input"
            placeholder="Confirm your password"
            @blur="checkpwd"
            required
          />
        </div>
        <div v-if="this.check">
          <span>비밀번호를 확인해주세요</span>
        </div>
        <div class="accounts__form__item">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="form__item__input"
            placeholder="Enter your name"
            required
          />
        </div>
        <button
          class="accounts__form__submit-btn"
          type="button"
          @click="confirm"
        >
          Register
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

const accountsStore = "accountsStore";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      name: "",
      check: false,
    };
  },
  methods: {
    checkpwd: function () {
      if (this.password === "" || this.password2 === "")
        return (this.check = false);
      if (this.password !== this.password2) {
        this.check = true;
      } else {
        this.check = false;
      }
      return this.check;
    },

    ...mapActions(accountsStore, ["asyncSignup", "getUserInfo"]),
    async confirm() {
      let user = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      await this.asyncSignup(user);
      alert("환영합니다");
      this.$router.push({ name: "Home" });
    },
    async checkid(email) {
      await this.asyncGetLogin(email);
    },
  },
};
</script>

<style scoped>
span {
  color: tomato;
}
</style>
