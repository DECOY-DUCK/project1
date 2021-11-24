<template>
  <section class="view-chart">
    <div class="chart-container">
      <h4>최근 1년 실거래가</h4>
      <line-chart :options="lineChart" :data="lineChartData" />
      <bar-chart :options="barChart" :data="barChartData" />
    </div>

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
      <common-table :items="houseDealsByPy.slice(0, 8)" />
    </div>
  </section>
</template>

<script>
import FilterButton from "@/components/buttons/FilterButton.vue";
import CommonTable from "@/components/chart/CommonTable.vue";
import LineChart from "@/components/chart/LineChart.vue";
import BarChart from "@/components/chart/BarChart.vue";
const lineChartOpts = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        padding: 2.5,
        callback: function (value, index) {
          return index % 2 ? "" : `${Math.floor(value / 1000) / 10}억`;
        },
        stepSize: 5000,
        autoSkip: true,
      },
    },
    x: {
      ticks: {
        display: false,
      },
    },
  },
};
const barChartOpts = {
  responsive: true,
  scales: {
    x: {
      offset: false,
      grid: {
        offset: false,
      },
      ticks: {
        callback: function (val, index) {
          return index % 2 ? "" : this.getLabelForValue(val);
        },
      },
    },
    y: {
      ticks: {
        padding: 15,
        stepSize: 1,
        callback: function (val) {
          return Math.floor(val);
        },
      },
    },
  },
};

export default {
  components: { FilterButton, CommonTable, LineChart, BarChart },
  name: "HouseDealViewChart",
  props: {
    houseDeals: Array,
  },
  data() {
    return {
      pySet: [],
      allHouseDealsByPy: {},
      filterPy: "",
      lineChart: {
        label: "월 평균 거래금액",
        labels: [],
        opts: lineChartOpts,
      },
      lineChartData: [],
      barChart: {
        label: "거래량",
        labels: [],
        opts: barChartOpts,
      },
      barChartData: [],
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

    for (let i = 1; i <= 12; i++) {
      this.lineChart.labels[i - 1] = `2019.${this.parseDate(i)}`;
    }
    this.barChart.labels = this.lineChart.labels;
    this.setChartData();
  },

  methods: {
    areaToPy(area) {
      return Math.round(area * 0.3025);
    },
    filterHandler(py) {
      this.filterPy = py;
      this.setChartData();
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
    calcAverage(list) {
      const len = list.length;
      return len
        ? Math.floor(
            list.reduce(
              (sum, curr) => (sum += +curr["가격"].replace(/\D/g, "")),
              0
            ) /
              len /
              1000
          ) * 1000
        : null;
    },
    filterHouseDealsByMonth(month) {
      return this.houseDealsByPy.filter(
        (item) => +item["계약일"].split(".")[1] === +month
      );
    },
    setChartData() {
      for (let i = 1; i <= 12; i++) {
        const filtered = this.filterHouseDealsByMonth(i);
        this.$set(this.lineChartData, i - 1, this.calcAverage(filtered, i + 1));
        this.$set(this.barChartData, i - 1, filtered.length);
      }
      const temp = this.houseDealsByPy.map(
        (h) => +h["가격"].replace(/\D/g, "")
      );

      lineChartOpts.scales.y.min =
        Math.floor(Math.min(...temp) / 10000) * 10000;
      lineChartOpts.scales.y.max = Math.ceil(Math.max(...temp) / 10000) * 10000;
    },
  },
};
</script>

<style scoped>
.filter-buttons {
  text-align: right;
}

.view-recentDeals {
  margin-top: var(--size-medium);
}
</style>
