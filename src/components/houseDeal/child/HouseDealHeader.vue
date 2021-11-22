<template>
  <header class="houseDeal-header">
    <div class="header-container">
      <div class="header-selector selector">
        <region-selector :onSearch="onSearchHandler" />
      </div>
      <div class="header-buttons" v-if="isSaved !== null">
        <on-off-button
          v-for="(button, index) in onOffButtons"
          :key="index"
          :button="button"
          :isSaved="isSaved"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import {
  getInterestArea,
  saveInterestArea,
  deleteInterestArea,
} from "@/api/interest.js";
import RegionSelector from "@/components/houseDeal/child/RegionSelector.vue";
import OnOffButton from "@/components/buttons/OnOffButton.vue";

const houseDealStore = "houseDealStore";
const accountsStore = "accountsStore";

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
          onHandler: this.interestOnHandler, // 관심지역 설정 or 삭제
          offHandler: this.interestOffHandler,
        },
      ],
      isSaved: null,
    };
  },
  async created() {
    try {
      if (this.isLogin) {
        const result = await getInterestArea(this.userInfo.no, this.dongCode);
        this.isSaved = result ? true : false;
      }
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    ...mapState(houseDealStore, ["dongCode", "dongName", "houseInfos"]),
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
  },

  /**
   * MAP에 전해줘야 하는것
   *    // HEADER에서 바로 작업해도 될듯?
   *    - 관심지역 : 1. 관심지역인지 여부 확인
   *                2. 관심지역인 경우 삭제 작업 후 , vuex STORE 내 관심지역 리스트 업데이트
   *                3. 관심지역 아닌 경우 등록 작업 후 vuex STORE 업데이트
   */
  methods: {
    async interestOnHandler() {
      try {
        const result = await saveInterestArea(this.userInfo.no, this.dongCode);
        if (result == "success") {
          alert(`${this.dongName}: 관심지역으로 등록되었습니다.`);
          return true;
        }
        alert("처리 중 문제가 발생했습니다.");
        return false;
      } catch (e) {
        alert("처리 중 문제가 발생했습니다.");
        console.error(e);
        return false;
      }
    },
    async interestOffHandler() {
      try {
        const result = await deleteInterestArea(
          this.userInfo.no,
          this.dongCode
        );
        if (result == "success") {
          alert(`${this.dongName}: 관심지역에서 해제되었습니다.`);
          return true;
        }
        alert("처리 중 문제가 발생했습니다.");
        return false;
      } catch (e) {
        alert("처리 중 문제가 발생했습니다.");
        console.error(e);
        return false;
      }
    },
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
