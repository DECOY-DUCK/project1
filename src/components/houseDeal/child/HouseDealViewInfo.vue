<template>
  <section class="view-info">
    <div class="info-map">
      <div id="map"></div>
      <div id="roadview"></div>
    </div>
  </section>
</template>

<script>
import mImage1 from "@/assets/images/marker1.png";

export default {
  name: "HouseDealViewInfo",
  props: {
    map: Object,
    houseDeals: Array,
  },
  data() {
    return {
      address: "",
    };
  },
  mounted() {
    if (!this.map) return;
    this.address = `${this.houseDeals[0].dong} ${this.houseDeals[0].jibun} ${this.houseDeals[0].aptName}`;
    this.map.initMap(this.address);
    this.map.setMarker(this.address, {
      imageSrc: mImage1,
      imageSize: new kakao.maps.Size(24, 35),
      imageOption: {
        offset: new kakao.maps.Point(24, 17),
      },
    });
    this.map.setRoadView(this.address);
  },
};
</script>

<style scoped>
.info-map {
  width: 36rem;
  height: 18rem;
  display: flex;
}
#map {
  width: 50%;
  height: 100%;
}
#roadview {
  width: 50%;
  height: 100%;
}
</style>
