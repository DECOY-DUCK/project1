<template>
  <section>
    <router-view />
  </section>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
@import "../assets/css/account.css";
</style>
