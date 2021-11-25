<template>
  <section id="houseDeal" class="section-container">
    <router-view v-if="map !== null" :map="map" />
  </section>
</template>

<script>
import { config } from "@/config";
import Map from "@/utils/map.js";

export default {
  name: "HouseDeal",
  data() {
    return {
      map: null,
    };
  },
  created() {
    this.setMap();
  },
  methods: {
    setMap() {
      if (window.kakao && window.kakao.maps) {
        this.map = new Map();
      } else {
        const script = document.createElement("script");
        script.onload = () =>
          kakao.maps.load(() => {
            this.map = new Map();
          });
        script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${config.api.kakaoMapKey}&libraries=services`;
        document.head.appendChild(script);
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.houseDeal-main {
  flex: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
