<template>
  <section class="accounts" id="findPwd">
    <div class="accounts__container findPwd__home">
      <header class="accounts__header">
        <h2>Find password</h2>
      </header>
      <form class="accounts__form" method="post" action="">
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
            @blur="check"
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
            @blur="check"
            required
          />
        </div>
        <div v-if="show">
          <span>이메일 과 비밀번호를 다시 확인해주세요 </span>
        </div>
        <button
          class="accounts__form__submit-btn"
          @click="confirm()"
          type="button"
        >
          Confirm
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
    async confirm() {
      if (this.checkbalank) {
        //실패 조건문 추가하는게 좋을듯
        await this.asyncFindpwd(this.user);
        this.$router.push({ name: "Home" });
      } else {
        this.show = true;
      }
    },
    check: function () {
      if (this.user.email !== null && this.email.user.name !== null) {
        return (this.checkblank = true);
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
