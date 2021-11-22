<template>
  <section class="body-container" id="housedeal-detail">
    <header class="view-header">
      <h2>{{ this.aptName }}</h2>
      <p>건축연도: {{ this.houseDeals && this.houseDeals[0].buildYear }}</p>
    </header>
    <main class="view-body">
      <house-deal-view-info
        :houseDeals="houseDeals"
        :map="map"
        v-if="houseDeals !== null"
      />
      <house-deal-view-chart
        :houseDeals="houseDeals"
        v-if="houseDeals !== null"
      />
      <house-deal-view-community />
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
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
      houseDeals: null,
      aptName: "",
    };
  },
  computed: {
    ...mapState(houseDealStore, ["gugunCode", "dongName"]),
  },
  async created() {
    this.aptName = this.$route.params.aptName;
    const result = await getHouseDeals(this.aptName, {
      gugunCode: this.gugunCode,
      dongName: this.dongName,
    });
    this.houseDeals = result;
    console.log(this.houseDeals);
  },
};
</script>

<style scoped>
/* 수정 필요~!! */
#housedeal-detail {
  width: 100%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 0 var(--size-large);
  padding-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
