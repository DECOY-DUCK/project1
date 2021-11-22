<template>
  <section class="accounts" id="edit">
    <div class="accounts__container">
      <header class="accounts__header">
        <h2>Edit Profile</h2>
      </header>
      <form class="accounts__form" method="" action="">
        <input type="hidden" name="act" value="modify" />
        <div class="accounts__form__item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form__item__input"
            :value="email"
            @blur="check"
            readonly
          />
        </div>
        <div class="accounts__form__item">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form__item__input"
            placeholder="Enter new password"
            @blur="check"
            required
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
            @blur="check"
            required
          />
          <div v-if="this.check">
            <span>이메일과 비밀번호를 다시 확인해주세요</span>
          </div>
        </div>
        <div class="accounts__form__item">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="form__item__input"
            required
          />
        </div>

        <button
          class="accounts__form__submit-btn"
          @click="confirm"
          type="button"
        >
          Confirm
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import store from "@/store/index";
import { mapActions } from "vuex";

const accountsStore = "accountsStore";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      name: "",
      checkblank: false,
      show: false,
    };
  },
  created() {
    const userInfo = store.getters["accountsStore/checkUserInfo"];
    this.email = userInfo.email;
    this.name = userInfo.name;
  },
  methods: {
    check: function () {
      if (this.email == "") {
        return (this.show = true);
      } else if (this.password === "" || this.password2 === "")
        return (this.show = true);
      else if (this.password !== this.password2) {
        this.show = true;
      } else {
        return (this.checkblank = true);
      }
    },
    ...mapActions(accountsStore, ["asyncUpdateUserInfo"]),
    async confirm() {
      //user 번호 불러오기
      let userInfo = store.getters["accountsStore/checkUserInfo"];
      let user = {
        no: userInfo.no,
        email: this.email,
        password: this.password,
        name: this.name,
      };
      if (this.checkblank) {
        await this.asyncUpdateUserInfo(user);
        this.$router.push({ name: "MyPage" });
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style scoped>
span {
  color: tomato;
}
</style>
