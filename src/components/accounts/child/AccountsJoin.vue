<template>
  <section class="accounts" id="signup" @submit="onSubmit">
    <div class="accounts__container" v-if="!authk">
      <header class="accounts__header">
        <h2>Sign up</h2>
        <p>Welcome!</p>
      </header>
      <form method="post" id="userform">
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
            @blur="idpass"
          />
        </div>
        <span v-show="idrecheck">중복 아이디 입니다.</span>
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
        <div>
          <form-button type="submit" title="Register" />
        </div>
      </form>
    </div>
    <div v-else>
      <div class="accounts__container findPwd__home">
        <header class="accounts__header">
          <h2>Find password</h2>
        </header>
        <form class="accounts__form">
          <div class="accounts__form__item">
            <label for="email">인증번호</label>
            <input
              type="text"
              id="authkey"
              name="authkey"
              v-model="authkey"
              class="form__item__input"
              placeholder="Enter your email"
              required
            />
          </div>
        </form>
        <button @click="sendAuthkey">인증하기</button>
      </div>
    </div>
  </section>
</template>

<script>
import { signup, idcheck, authkeycheck } from "@/api/auth";
import { mapActions } from "vuex";
import FormButton from "@/components/buttons/FormButton.vue";

const accountsStore = "accountsStore";

export default {
  components: { FormButton },
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      name: "",
      authkey: "",
      check: false,
      idrecheck: false,
      authk: false,
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    async idpass() {
      console.log(this.email);
      const result = await idcheck(this.email);
      console.log(result);
      if (result === 1) {
        //중복아이디
        this.idrecheck = true;
      } else {
        this.idrecheck = false;
      }
    },
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
    async sendAuthkey() {
      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        authkey: this.authkey,
      };
      console.log(user);
      const result = await authkeycheck(user);
      if (result == 1) {
        alert("가입을 축하드립니다");
        this.$router.push({ name: "LogIn" });
      }
    },
    ...mapActions(accountsStore, ["asyncSignup", "asyncGetUserInfo"]),
    async onSubmit(e) {
      e.preventDefault();

      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        const result = await signup(user);
        if (result === "success") {
          alert("이메일을 통해 인증번호를 입력해 주세요");
          this.authk = true;
        } else {
          alert("회원가입 실패.");
        }
      } catch (e) {
        console.error(e);
      }
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
