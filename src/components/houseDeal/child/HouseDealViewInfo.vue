<template>
  <section class="view-info">
    <div class="info-map">
      <div id="map"></div>
      <div id="roadview"></div>
    </div>
    <div class="info-text">
      <house-deal-table :items="safeHospitalList" />
      <house-deal-table :items="selectedClinicList" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import mImage1 from "@/assets/images/marker1.png";
import { getSafeHospitals, getSelectedClinics } from "@/api/environment.js";
import HouseDealTable from "@/components/houseDeal/child/HouseDealTable.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { HouseDealTable },
  name: "HouseDealViewInfo",
  props: {
    map: Object,
    address: String,
    houseDeals: Array,
  },
  data() {
    return {
      safeHospitals: [],
      selectedClinics: [],
    };
  },
  computed: {
    ...mapState(houseDealStore, [
      "sidoName",
      "gugunName",
      "dongName",
      "houseInfos",
    ]),
    safeHospitalList() {
      if (!this.safeHospitals.length) return;

      return this.safeHospitals
        .map((h) => ({
          병원: h.name,
          번호: h.phone,
        }))
        .slice(0, 5);
    },
    selectedClinicList() {
      if (!this.selectedClinics.length) return;

      return this.selectedClinics
        .map((h) => ({
          진료소: h.name,
          번호: h.phone,
        }))
        .slice(0, 5);
    },
  },
  created() {
    this.asyncGetSelectedClinics();
    this.asyncGetSafeHospitals();
  },

  mounted() {
    if (!this.map) return;

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

  methods: {
    async asyncGetNearByInfos(asyncFunc, infos) {
      if (!this.sidoName || !this.gugunName) {
        alert("지역을 선택해 주세요.");
        return false;
      }
      try {
        this[infos] = await asyncFunc(
          this.sidoName.slice(0, 2),
          this.gugunName
        );
        return true;
      } catch (e) {
        console.error(e);
      }
    },
    async asyncGetSelectedClinics() {
      try {
        await this.asyncGetNearByInfos(getSelectedClinics, "selectedClinics");
        console.log(this.selectedClinics);
      } catch (e) {
        console.error(e);
      }
    },
    async asyncGetSafeHospitals() {
      try {
        await this.asyncGetNearByInfos(getSafeHospitals, "safeHospitals");
        console.log(this.safeHospitals);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.view-info {
  flex-basis: 30%;
}
.info-map {
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#map {
  width: 100%;
  height: 100%;
}
#roadview {
  width: 100%;
  height: 100%;
}

.info-text table {
  display: none;
  width: 100%;
  overflow: hidden;
}
</style>
