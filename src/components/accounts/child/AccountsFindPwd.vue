<template>
  <section class="accounts" id="findPwd">
    <div class="accounts__container findPwd__home">
      <header class="accounts__header">
        <h2>Find password</h2>
      </header>
      <form class="accounts__form" @submit="confirm">
        <input type="hidden" name="act" value="findPwd" />
        <div class="accounts__form__item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="user.email"
            class="form__item__input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="accounts__form__item">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="user.name"
            class="form__item__input"
            placeholder="Enter your name"
            required
          />
        </div>
        <div v-if="show">
          <span>이메일 과 비밀번호를 다시 확인해주세요 </span>
        </div>
        <form-button type="submit" title="Confirm" />
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import FormButton from "@/components/buttons/FormButton.vue";
const accountsStore = "accountsStore";

export default {
  components: { FormButton },
  data() {
    return {
      user: {
        email: null,
        name: null,
      },
      checkblank: false,
      show: false,
    };
  },
  methods: {
    ...mapActions(accountsStore, ["asyncFindpwd"]),
    async confirm(e) {
      e.preventDefault();

      if (this.user.email !== null && this.user.name !== null) {
        //실패 조건문 추가하는게 좋을듯
        await this.asyncFindpwd(this.user);
        this.$router.push({ name: "Home" });
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
