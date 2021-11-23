<template>
  <section class="view-chart">
    <div class="view-recentDeals">
      <div class="filter-buttons">
        <filter-button
          v-for="(py, index) in pySet"
          :key="index"
          :title="py + '평'"
          :value="py + ''"
          :selected="filterPy + ''"
          :filterHandler="filterHandler"
        />
      </div>
      <house-deal-table :items="houseDealsByPy.slice(0, 8)" />
    </div>
  </section>
</template>

<script>
import FilterButton from "@/components/buttons/FilterButton.vue";
import HouseDealTable from "@/components/houseDeal/child/HouseDealTable.vue";

export default {
  components: { FilterButton, HouseDealTable },
  name: "HouseDealViewChart",
  props: {
    houseDeals: Array,
  },
  data() {
    return {
      pySet: [],
      allHouseDealsByPy: {},
      filterPy: "",
    };
  },
  computed: {
    houseDealsByPy() {
      return this.allHouseDealsByPy[this.filterPy];
    },
  },

  created() {
    this.pySet = Array.from(
      new Set(this.houseDeals.map((h) => this.areaToPy(h.area)))
    );
    this.allHouseDealsByPy = this.pySet.reduce((result, py) => {
      result[py] = this.houseDeals
        .filter((h) => this.areaToPy(h.area) === py)
        .map((h) => ({
          계약일: this.dealDate(h.dealYear, h.dealMonth, h.dealDay),
          가격: this.trimDealAmount(h.dealAmount) + "만원",
          평형: this.areaToPy(h.area),
          층: h.floor + "층",
        }));
      return result;
    }, {});

    this.filterPy = this.pySet[0];
  },
  methods: {
    areaToPy(area) {
      return Math.round(area * 0.3025);
    },
    filterHandler(py) {
      this.filterPy = py;
    },
    dealDate(dealYear, dealMonth, dealDay) {
      return `${dealYear}.${this.parseDate(dealMonth)}.${this.parseDate(
        dealDay
      )}`;
    },
    trimDealAmount(dealAmount) {
      return dealAmount.trim();
    },
    parseDate(date) {
      return date < 10 ? `0${date}` : date;
    },
  },
};
</script>

<style scoped>
.filter-buttons {
  text-align: right;
}
</style>
