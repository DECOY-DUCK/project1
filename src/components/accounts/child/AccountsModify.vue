<template>
  <section class="accounts" id="edit">
    <div class="accounts__container">
      <header class="accounts__header">
        <h2>Edit Profile</h2>
      </header>
      <form class="accounts__form" @submit="onSubmit">
        <input type="hidden" name="act" value="modify" />
        <div class="accounts__form__item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form__item__input"
            :value="email"
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
            required
          />
          <div v-if="this.show">
            <span>비밀번호를 다시 확인해주세요</span>
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
        <form-button type="submit" title="Confirm" />
      </form>
    </div>
  </section>
</template>

<script>
import store from "@/store/index";
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

      show: false,
    };
  },
  created() {
    const userInfo = store.getters["accountsStore/checkUserInfo"];
    this.email = userInfo.email;
    this.name = userInfo.name;
  },
  methods: {
    ...mapActions(accountsStore, ["asyncUpdateUserInfo"]),
    async onSubmit(e) {
      e.preventDefault();

      //user 번호 불러오기
      let userInfo = store.getters["accountsStore/checkUserInfo"];
      let user = {
        no: userInfo.no,
        email: this.email,
        password: this.password,
        name: this.name,
      };
      if (
        this.password === this.password2 &&
        (this.password !== "" || this.password2 !== "")
      ) {
        await this.asyncUpdateUserInfo(user);
        this.$router.push({ name: "Management" });
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
