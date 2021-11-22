<template>
  <section id="houseDeal" class="section-container">
    <router-view />
  </section>
</template>

<script>
export default {
  name: "HouseDeal",
};
</script>

<style scoped>
#houseDeal {
  display: flex;
  flex-direction: column;
}

.houseDeal-main {
  flex: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
