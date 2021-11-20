<template>
  <section id="houseDeal" class="section-container">
    <house-deal-header
      :onSearchHandler="displayHouseInfos"
      :onClickHandler="{
        clinicOnHandler,
        clinicOffHandler,
        hospitalOnHandler,
        hospitalOffHandler,
      }"
    />
    <house-deal-body :map="map" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import HouseDealHeader from "@/components/houseDeal/child/HouseDealHeader.vue";
import HouseDealBody from "@/components/houseDeal/child/HouseDealBody.vue";
import { getSafeHospitals, getSelectedClinics } from "@/api/environment.js";
import { config } from "@/config";
import Map from "@/utils/map.js";
import mImage1 from "@/assets/images/marker1.png";
import mImage2 from "@/assets/images/safe_hospital.png";
import mImage3 from "@/assets/images/selected_clinic.png";

/**
 * MAP에 전해줘야 하는것
 *    // HEADER에서 바로 작업해도 될듯?
 *    - 관심지역 : 1. 관심지역인지 여부 확인
 *                2. 관심지역인 경우 삭제 작업 후 , vuex STORE 내 관심지역 리스트 업데이트
 *                3. 관심지역 아닌 경우 등록 작업 후 vuex STORE 업데이트
 */
const houseDealStore = "houseDealStore";
export default {
  name: "HouseDeal",
  components: { HouseDealHeader, HouseDealBody },
  data() {
    return {
      map: null,
      safeHospitals: [],
      selectedClinics: [],
      markers: [],
      hMarkers: [],
      cMarkers: [],
      markerOpt: {},
      cMarkerOpt: {},
      hMarkerOpt: {},
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.map = new Map();
      this.setMarkersOpt();
      this.displayHouseInfos();
    } else {
      const script = document.createElement("script");
      script.onload = () =>
        kakao.maps.load(() => {
          this.map = new Map();
          this.setMarkersOpt();
          this.displayHouseInfos();
        });
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${config.api.kakaoMapKey}&libraries=services`;
      document.head.appendChild(script);
    }
  },

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
      } catch (e) {
        console.error(e);
      }
    },
    async clinicOnHandler() {
      try {
        const result = await this.asyncGetNearByInfos(
          getSelectedClinics,
          "selectedClinics"
        );
        if (this.selectedClinics.length) {
          this.map.setMarkers(
            this.addMarkerContent("selectedClinics"),
            this.cMarkerOpt,
            this.cMarkers
          );
          this.setMapLevel(this.selectedClinics);
        }

        return result ? true : false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async hospitalOnHandler() {
      try {
        const result = await this.asyncGetNearByInfos(
          getSafeHospitals,
          "safeHospitals"
        );
        if (this.safeHospitals.length) {
          this.map.setMarkers(
            this.addMarkerContent("safeHospitals"),
            this.hMarkerOpt,
            this.hMarkers
          );
          this.setMapLevel(this.safeHospitals);
        }
        return result ? true : false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    clinicOffHandler() {
      this.map.hideMarkers(this.cMarkers);
    },
    hospitalOffHandler() {
      this.map.hideMarkers(this.hMarkers);
    },
    addMarkerContent(infos) {
      return this[infos].map((item) => {
        const marker = {};
        marker.address = item.address;
        marker.title = item.name || item.aptName;
        const content = {
          tel: item.phone,
          건축연도: item.buildYear,
        };
        marker.content = this.map.infoToHtml(marker.title, content);
        return marker;
      });
    },
    setMapLevel(markers) {
      if (markers[0]["address"].includes(this.gugunName)) {
        this.map.setLevel(7);
      } else {
        this.map.setLevel(8);
      }
    },
    displayHouseInfos() {
      this.markers.length && this.map.hideMarkers(this.markers);
      this.map.initMap(this.address);
      this.houseInfos.length &&
        this.map.setMarkers(
          this.addMarkerContent("houseInfos"),
          this.markerOpt,
          this.markers
        );
    },
    setMarkerOpt(type, imageSrc, imageSize, imageOption) {
      this[type] = {
        imageSrc,
        imageSize,
        imageOption,
      };
    },
    setMarkersOpt() {
      this.setMarkerOpt("markerOpt", mImage1, new kakao.maps.Size(24, 35), {
        offset: new kakao.maps.Point(24, 17),
      });
      this.setMarkerOpt("hMarkerOpt", mImage2, new kakao.maps.Size(22, 22), {
        offset: new kakao.maps.Point(11, 11),
      });
      this.setMarkerOpt("cMarkerOpt", mImage3, new kakao.maps.Size(22, 22), {
        offset: new kakao.maps.Point(22, 22),
      });
    },
  },
};
</script>

<style scoped>
#houseDeal {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
