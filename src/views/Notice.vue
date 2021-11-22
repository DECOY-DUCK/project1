<template>
  <section id="notice" class="section-container">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "Notice",
};
</script>

<style>
#notice {
  padding-bottom: var(--size-large);
}
</style>
