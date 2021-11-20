<template>
  <header class="houseDeal-header">
    <div class="header-container">
      <div class="header-selector selector">
        <region-selector :onSearch="onSearchHandler" />
      </div>
      <div class="header-buttons">
        <on-off-button
          v-for="(button, index) in onOffButtons"
          :key="index"
          :button="button"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import RegionSelector from "@/components/houseDeal/child/RegionSelector.vue";
import OnOffButton from "@/components/buttons/OnOffButton.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { RegionSelector, OnOffButton },
  name: "HouseDealHeader",
  props: {
    onSearchHandler: Function,
    onClickHandler: Object,
  },
  data() {
    return {
      onOffButtons: [
        {
          title: "국민안심병원",
          icon: '<i class="fas fa-clinic-medical"></i>',
          onColor: "button__blue",
          onHandler: this.onClickHandler.hospitalOnHandler, // 맵에 마커띄우기 or 삭제
          offHandler: this.onClickHandler.hospitalOffHandler,
        },
        {
          title: "선별진료소",
          icon: '<i class="fas fa-shield-virus"></i>',
          onColor: "button__red",
          onHandler: this.onClickHandler.clinicOnHandler, // 맵에 마커띄우기 or 삭제
          offHandler: this.onClickHandler.clinicOffHandler,
        },
        {
          title: "관심지역",
          icon: '<i class="far fa-bookmark"></i>',
          onHandler: () => console.log("interest"), // 관심지역 설정 or 삭제
        },
      ],
    };
  },
  computed: {
    ...mapState(houseDealStore, ["dongCode", "dongName", "houseInfos"]),
  },
};
</script>

<style scoped>
.houseDeal-header {
  width: 100%;
  position: fixed;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light-grey);
  z-index: 99;
}

.header-container {
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 0 var(--size-large);
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;
}

.header-selector {
  transform: translateX(calc(var(--size-large) * -1));
}
</style>
