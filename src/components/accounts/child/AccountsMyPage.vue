<template>
  <div class="my__page">
    <div class="grid__area">
      <header class="grid__header"></header>
      <div class="grid__up_left">
        <div class="accounts__profile"></div>
        <account-info />
      </div>
      <div class="grid__up_right" v-if="userInfo.authCode == ''">
        <interest-area />
      </div>
      <div class="grid__up_right" v-else><admin-page /></div>
      <div class="grid__down_left">4</div>
      <div class="grid__down_center">5</div>
      <div class="grid__down_right">6</div>
    </div>
  </div>
</template>

<script>
import AccountInfo from "./mypage/AccountInfo";
import InterestArea from "./mypage/InterestArea";
import AdminPage from "./mypage/AdminPage.vue";

// import Something1 from "./mypage/Something1";

// import Something2 from "./mypage/Something2";
// import Something3 from "./mypage/Something3";
import store from "@/store/index";
export default {
  components: {
    AccountInfo,
    InterestArea,
    AdminPage,
    // Something1,
    // Something2,
    // Something3,
    // data() {
    //   return {
    //     userInfo: {},
    //   };
    // },
  },
  data() {
    return {
      userInfo: "",
    };
  },
  created() {
    this.userInfo = store.getters["accountsStore/checkUserInfo"];
  },
};
</script>

<style scoped>
.my__page {
  height: 100vh;
  padding: calc(2 * var(--size-large));
  background-color: var(--color-back);
}
.grid__area {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    ". . . . . . ."
    "h h h h h h h"
    "a a b b b b b"
    "a a b b b b b"
    "a a b b b b b"
    "a a b b b b b"
    "c d d d d d e"
    "c d d d d d e"
    "c d d d d d e"
    "c d d d d d e";

  column-gap: 1rem;
  row-gap: 2rem;
}
.grid__up_left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5rem;

  grid-area: a;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
.grid__up_right {
  display: flex;
  align-items: center;
  justify-content: center;

  grid-area: b;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
  align-items: center;
  justify-content: center;
}
.grid__down_left {
  grid-area: c;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
.grid__down_center {
  grid-area: d;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
.grid__down_right {
  grid-area: e;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
.grid__header {
  grid-area: h;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
</style>
