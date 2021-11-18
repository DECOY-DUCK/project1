<template>
  <div class="body-container">
    <section id="home">
      <home-header />
      <home-main />
    </section>
  </div>
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
  max-width: var(--display-maxWidth);
  margin: 0 auto;
}
</style>
