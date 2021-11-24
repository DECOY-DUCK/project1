<template>
  <section class="view-info">
    <div class="info-map">
      <h4>위치 정보</h4>
      <div id="map"></div>
      <div id="roadview"></div>
    </div>
    <div class="info-text">
      <h4>인근 선별진료소</h4>
      <common-table :items="selectedClinicList" />
      <h4>인근 국민안심병원</h4>
      <common-table :items="safeHospitalList" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import mImage1 from "@/assets/images/marker1.png";
import { getSafeHospitals, getSelectedClinics } from "@/api/environment.js";
import CommonTable from "@/components/chart/CommonTable.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { CommonTable },
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
      } catch (e) {
        console.error(e);
      }
    },
    async asyncGetSafeHospitals() {
      try {
        await this.asyncGetNearByInfos(getSafeHospitals, "safeHospitals");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.view-info {
  flex-basis: 27.5%;
}
.info-map {
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#map {
  width: 100%;
  height: 100%;
  margin-top: var(--size-regular);
}
#roadview {
  width: 100%;
  height: 100%;
}

.info-text {
  margin: var(--size-large) 0;
}

.info-text h4 {
  transform: translateY(var(--size-small));
}

.info-text table {
  width: 100%;
  margin-top: var(--size-large);
  overflow: hidden;
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .info-map {
    height: 30rem;
  }
}
</style>
