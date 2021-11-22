<template>
  <div class="my__page">
    <div class="grid__area">
      <header class="grid__header"></header>
      <div class="grid__up_left"><account-info /></div>
      <div class="grid__up_right">3</div>
      <div class="grid__down_left">4</div>
      <div class="grid__down_center">5</div>
      <div class="grid__down_right">6</div>
    </div>
  </div>
</template>

<script>
import AccountInfo from "./mypage/AccountInfo";
// import InterestArea from "./mypage/InterestArea";

// import Something1 from "./mypage/Something1";

// import Something2 from "./mypage/Something2";
// import Something3 from "./mypage/Something3";

export default {
  components: {
    AccountInfo,
    // InterestArea,
    // Something1,
    // Something2,
    // Something3,
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
    "h h h h h h h"
    "a a a b b b b"
    "a a a b b b b"
    "a a a b b b b"
    "a a a b b b b"
    "c c d d d e e"
    "c c d d d e e"
    "c c d d d e e"
    "c c d d d e e";

  column-gap: 1rem;
  row-gap: 2rem;
}
.grid__up_left {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: a;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border-radius: var(--size-small);
}
.grid__up_right {
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
