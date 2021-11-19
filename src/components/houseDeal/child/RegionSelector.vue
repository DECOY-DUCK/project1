<template>
  <form id="selector" @submit="onSearchHandler">
    <select name="sido" id="sido" v-model="sidoCode" @change="setGugunList">
      <option :value="null">도/광역시</option>
      <option v-for="(sido, index) in sidos" :key="index" :value="sido.value">
        {{ sido.text | parseSidoName }}
      </option>
    </select>

    <select name="gugun" id="gugun" v-model="gugunCode" @change="setDongList">
      <option :value="null">시/군/구</option>
      <option
        v-for="(gugun, index) in guguns"
        :key="index"
        :value="gugun.value"
      >
        {{ gugun.text }}
      </option>
    </select>

    <select name="dong" id="dong" v-model="dongCode" @change="setDongName">
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
  data() {
    return {
      sidoCode: null,
      sidoName: "",
      gugunCode: null,
      dongCode: null,
      dongName: null,
    };
  },
  computed: {
    ...mapState(houseDealStore, ["sidos", "guguns", "dongs"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.asyncGetSidos();
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
      "asyncGetHouseDeals",
    ]),
    ...mapMutations(houseDealStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    setGugunList() {
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.gugunCode = null;
      this.dongCode = null;
      if (this.sidoCode) {
        this.asyncGetGuguns(this.sidoCode);
      }
    },
    setDongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) {
        this.asyncGetDongs(this.gugunCode);
      }
    },
    setDongName(e) {
      this.dongName = e.target.options[e.target.selectedIndex].text;
    },
    onSearchHandler(e) {
      e.preventDefault();

      if (!this.dongCode) {
        alert("동을 선택해주세요.");
        return;
      }

      this.asyncGetHouseDeals({
        gugunCode: this.gugunCode,
        dongName: this.dongName,
        sizePerPage: 15,
        pageNo: 0,
      });
    },
  },
};
</script>

<style scoped>
#selector {
  width: 25rem;
  padding: 2px var(--size-large);
}

#search-button {
  font-size: var(--font-regular);
  transform: translate(var(--size-regular), 2px);
}

@media screen and (max-width: 768px) {
  #selector {
    width: 22.5rem;
    padding: 2px var(--size-small);
  }
}
</style>
