<template>
  <section class="body-container" id="housedeal-detail">
    <header class="view-header">
      <h3>{{ this.aptName }}</h3>
      <span> {{ this.address }}</span>
      <span>건축 연도: {{ this.houseInfo && this.houseInfo.buildYear }}</span>
    </header>
    <main class="view-body">
      <div class="view-contents">
        <house-deal-view-chart
          :houseDeals="houseDeals"
          v-if="houseDeals !== null"
        />
        <house-deal-view-community />
      </div>
      <house-deal-view-info
        :map="map"
        :address="address"
        :houseDeals="houseDeals"
        v-if="houseDeals !== null"
      />
    </main>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getHouseDeals } from "@/api/houseDeal.js";
import HouseDealViewChart from "./child/HouseDealViewChart.vue";
import HouseDealViewInfo from "./child/HouseDealViewInfo.vue";
import HouseDealViewCommunity from "./child/HouseDealViewCommunity.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { HouseDealViewChart, HouseDealViewInfo, HouseDealViewCommunity },
  name: "HouseDealView",
  props: {
    map: Object,
  },
  data() {
    return {
      houseInfo: {},
      houseDeals: null,
      aptName: "",
      aptNo: 0,
    };
  },
  computed: {
    ...mapState(houseDealStore, [
      "sidoName",
      "gugunName",
      "gugunCode",
      "dongName",
      "houseInfos",
    ]),
    address() {
      if (!this.houseInfo) return;
      if (!this.sidoName || !this.gugunName) return this.houseInfo.address;
      return `${this.sidoName} ${this.gugunName} ${this.houseInfo.dong} ${this.houseInfo.jibun}`;
    },
  },
  async created() {
    this.aptNo = this.$route.params.aptNo;
    this.houseInfo = this.houseInfos.find((h) => h.no == this.aptNo);

    if (!this.houseInfo) {
      this.$router.push({ name: "HouseDeal" });
    }
    this.setLocation();
    this.aptName = this.houseInfo.aptName;

    const result = await getHouseDeals(this.aptName, {
      gugunCode: this.gugunCode,
      dongName: this.dongName || this.houseInfo.dong,
      pageNo: 0,
      sizePerPage: 5,
    });
    this.houseDeals = result;
  },

  methods: {
    ...mapActions(houseDealStore, ["asyncGetSidoGugunByDong"]),
    setLocation() {
      this.asyncGetSidoGugunByDong(this.houseInfo.code);
    },
  },
};
</script>

<style scoped>
#housedeal-detail {
  width: 100%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 0 var(--size-large);
  padding-top: 2.5rem;
}

.view-header {
  margin-bottom: calc(var(--size-large) * 2);
}

.view-header h3 {
  position: relative;
  padding-bottom: var(--size-large);
  text-align: left;
}

.view-header h3::after {
  position: absolute;
  left: 0;
  top: 85%;
  content: "";
  width: 7.5%;
  min-width: 5rem;
  height: 2px;
  background-color: var(--color-light-grey);
}

.view-header span {
  display: block;
}
.view-body {
  display: flex;
  margin: var(--size-large) 0;
}

.view-contents {
  flex-basis: 72.5%;
  margin-right: calc(var(--size-large) * 2);
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .view-body {
    flex-direction: column;
  }
  .view-contents {
    margin-right: 0;
  }
}
</style>
