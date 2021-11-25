<template>
  <section id="home" class="section-container">
    <home-header />
    <home-main />
  </section>
</template>

<script>
import { mapActions } from "vuex";

import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeMain from "@/components/home/HomeMain.vue";

const houseDealStore = "houseDealStore";
export default {
  components: { HomeHeader, HomeMain },
  name: "Home",
  created() {
    window.scrollTo(0, 0);
    this.clearLocation();
  },
  methods: {
    ...mapActions(houseDealStore, ["clearLocation"]),
  },
};
</script>

<style>
#home {
  width: 100%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
}
</style>
