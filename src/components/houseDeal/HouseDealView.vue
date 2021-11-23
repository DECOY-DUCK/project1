<template>
  <section class="body-container" id="housedeal-detail">
    <header class="view-header">
      <h3>{{ this.aptName }}</h3>
      <span>건축 연도: {{ this.houseInfo.buildYear }}</span>
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
      houseInfo: {},
      houseDeals: null,
      aptName: "",
      address: "",
    };
  },
  computed: {
    ...mapState(houseDealStore, ["gugunCode", "dongName", "houseInfos"]),
  },
  async created() {
    this.aptName = this.$route.params.aptName;
    this.houseInfo = this.houseInfos.find((h) => h.aptName === this.aptName);
    this.address = `${this.houseInfo.dong} ${this.houseInfo.jibun}`;

    const result = await getHouseDeals(this.aptName, {
      gugunCode: this.gugunCode,
      dongName: this.dongName,
      pageNo: 0,
      sizePerPage: 5,
    });
    this.houseDeals = result;
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
}

.view-header {
  margin-bottom: var(--size-large);
}

.view-header h3 {
  text-align: left;
}
.view-body {
  display: flex;
}

.view-contents {
  flex-basis: 70%;
  margin-right: var(--size-large);
}
</style>
