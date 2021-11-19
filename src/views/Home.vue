<template>
  <section id="home" class="section-container">
    <home-header />
    <home-main />
  </section>
</template>

<script>
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeMain from "@/components/home/HomeMain.vue";
export default {
  components: { HomeHeader, HomeMain },
  name: "Home",
};
</script>

<style>
#home {
  width: 100%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
}
</style>
