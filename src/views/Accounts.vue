<template>
  <section id="accounts">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "Accounts",
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
@import "../assets/css/account.css";

#accounts .button {
  width: 100%;
  margin-top: calc(2 * var(--size-large));
  padding: var(--size-regular);
  border-radius: var(--size-micro);
  color: var(--color-white);
  background-color: var(--color-dark-grey);
}

#accounts .button :hover {
  background-color: var(--color-black);
}
</style>
