<template>
  <form id="selector" @submit="onSearchHandler">
    <select name="sido" id="sido" v-model="selectedSido" @change="setGugunList">
      <option :value="null">도/광역시</option>
      <option v-for="(sido, index) in sidos" :key="index" :value="sido.value">
        {{ sido.text | parseSidoName }}
      </option>
    </select>

    <select
      name="gugun"
      id="gugun"
      v-model="selectedGugun"
      @change="setDongList"
    >
      <option :value="null">시/군/구</option>
      <option
        v-for="(gugun, index) in guguns"
        :key="index"
        :value="gugun.value"
      >
        {{ gugun.text }}
      </option>
    </select>

    <select name="dong" id="dong" v-model="selectedDong" @change="setDongName">
      <option :value="null">동</option>
      <option v-for="(dong, index) in dongs" :key="index" :value="dong.value">
        {{ dong.text }}
      </option>
    </select>

    <button id="search-button">
      <b-icon icon="search" />
    </button>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { parseLocalName } from "@/utils/parse.js";

const houseDealStore = "houseDealStore";

export default {
  name: "RegionSelector",
  props: {
    onSearch: Function,
  },
  data() {
    return {
      selectedSido: null,
      selectedGugun: null,
      selectedDong: null,
      selectedDongName: null,
    };
  },
  computed: {
    ...mapState(houseDealStore, [
      "sidos",
      "guguns",
      "dongs",
      "sidoCode",
      "sidoName",
      "gugunCode",
      "gugunName",
      "dongCode",
      "dongName",
    ]),
  },

  created() {
    if (!this.$route.path.includes("housedeal")) {
      this.clearSidoList();
      this.asyncGetSidos();
      return;
    } else {
      this.selectedSido = this.sidoCode;
      this.selectedGugun = this.gugunCode;
      this.selectedDong = this.dongCode;
    }
  },
  filters: {
    parseSidoName(sidoName) {
      return parseLocalName(sidoName);
    },
  },
  methods: {
    ...mapActions(houseDealStore, [
      "asyncGetSidos",
      "asyncGetGuguns",
      "asyncGetDongs",
      "asyncGetHouseInfos",
    ]),
    ...mapMutations(houseDealStore, [
      "SET_SIDO",
      "SET_GUGUN",
      "SET_DONG",
      "CLEAR_SIDO",
      "CLEAR_GUGUN",
      "CLEAR_DONG",
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    setGugunList(e) {
      this.setSido(e);
      this.clearGugunList();
      if (this.sidoCode) {
        this.asyncGetGuguns(this.sidoCode);
      }
    },
    setDongList(e) {
      this.setGugun(e);
      this.clearDongList();
      if (this.gugunCode) {
        this.asyncGetDongs(this.gugunCode);
      }
    },
    setSido(e) {
      this.SET_SIDO({
        sidoName: e.target.options[e.target.selectedIndex].text,
        sidoCode: this.selectedSido,
      });
    },
    setGugun(e) {
      this.SET_GUGUN({
        gugunName: e.target.options[e.target.selectedIndex].text,
        gugunCode: this.selectedGugun,
      });
    },
    setDongName(e) {
      this.selectedDongName = e.target.options[e.target.selectedIndex].text;
    },
    setDong() {
      this.SET_DONG({
        dongName: this.selectedDongName,
        dongCode: this.selectedDong,
      });
    },
    clearSidoList() {
      this.CLEAR_SIDO();
      this.CLEAR_SIDO_LIST();
      this.selectedSido = null;
      this.clearGugunList();
    },
    clearGugunList() {
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_GUGUN();
      this.selectedGugun = null;
      this.clearDongList();
    },
    clearDongList() {
      this.CLEAR_DONG();
      this.CLEAR_DONG_LIST();
      this.selectedDong = null;
    },
    onSearchHandler(e) {
      e.preventDefault();
      this.setDong();
      if (!this.dongCode) {
        alert("동을 선택해주세요.");
        return;
      }

      this.asyncGetHouseInfos({
        gugunCode: this.gugunCode,
        dongName: this.dongName,
      }).then(() => {
        if (this.$route.path !== "/housedeal/main") {
          this.$router.push({ name: "HouseDealMain" });
          return;
        }
        this.onSearch();
      });
    },
  },
};
</script>

<style scoped>
#selector {
  width: 22.5rem;
  padding: 2px var(--size-large);
}

#search-button {
  font-size: var(--font-regular);
  transform: translate(var(--size-regular), 2px);
}
</style>
