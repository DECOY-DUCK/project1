<template>
  <div id="map"></div>
</template>

<script>
import { mapState } from "vuex";
// import { config } from "@/config";
// import Map from "@/utils/map.js";

const houseDealStore = "houseDealStore";

export default {
  name: "HouseDealMap",

  computed: {
    ...mapState(houseDealStore, [
      "sidoName",
      "gugunName",
      "dongName",
      "houseInfos",
    ]),
    address() {
      if (!this.sidoName || !this.gugunName || !this.dongName) return;
      return `${this.sidoName} ${this.gugunName} ${this.dongName}`;
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}

.infowindow-container {
  width: 13.5rem;
  height: 5rem;
  padding: var(--size-regular) var(--size-small);
}

.infowindow-infos {
  margin-top: var(--size-regular);
}

.infowindow-info {
  font-size: var(--font-small);
  font-weight: var(--weight-light);
  color: var(--color-dark-grey);
}
</style>
