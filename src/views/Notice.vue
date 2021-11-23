<template>
  <section id="notice" class="section-container">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "Notice",
  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
#notice {
  padding-bottom: var(--size-large);
}
</style>
