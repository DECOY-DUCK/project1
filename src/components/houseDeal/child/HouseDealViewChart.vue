<template>
  <section class="view-chart">
    <div class="chart-container">
      <h4>최근 1년 실거래가</h4>
      <line-chart :options="lineChart" :data="lineChartData" />
      <bar-chart :options="barChart" :data="barChartData" />
    </div>

    <div class="view-table">
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
      <common-table :items="tableData" />
      <show-more-button
        :onClick="onShowMore"
        :text="`더보기 (+${restTableData})`"
        v-if="isShowMore"
      />
      <show-more-button :onClick="onHideMore" text="접기" v-if="isHideMore" />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import FilterButton from "@/components/buttons/FilterButton.vue";
import CommonTable from "@/components/chart/CommonTable.vue";
import LineChart from "@/components/chart/LineChart.vue";
import BarChart from "@/components/chart/BarChart.vue";
import ShowMoreButton from "@/components/buttons/ShowMoreButton.vue";

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
const TABLE_SIZE = 5;
const accountsStore = "accountsStore";

export default {
  components: {
    FilterButton,
    CommonTable,
    LineChart,
    BarChart,
    ShowMoreButton,
  },
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
      tableIdx: TABLE_SIZE,
    };
  },
  computed: {
    ...mapState(accountsStore, ["isLogin"]),
    houseDealsByPy() {
      return this.allHouseDealsByPy[this.filterPy];
    },
    tableData() {
      return this.houseDealsByPy.slice(0, this.tableIdx);
    },
    restTableData() {
      return this.houseDealsByPy.length - this.tableIdx;
    },
    isShowMore() {
      return this.restTableData > 0;
    },
    isHideMore() {
      return (
        this.houseDealsByPy.length != TABLE_SIZE && this.restTableData == 0
      );
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
    this.setLineChartOpts();
  },

  methods: {
    areaToPy(area) {
      return Math.round(area * 0.3025);
    },
    filterHandler(py) {
      this.initShowMore();
      this.filterPy = py;
      this.setChartData();
      this.setLineChartOpts();
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
    },
    setLineChartOpts() {
      const temp = this.houseDealsByPy.map(
        (h) => +h["가격"].replace(/\D/g, "")
      );

      lineChartOpts.scales.y.min =
        Math.floor(Math.min(...temp) / 10000) * 10000 - 5000;
      lineChartOpts.scales.y.max =
        Math.ceil(Math.max(...temp) / 10000) * 10000 + 5000;
    },
    onShowMore() {
      if (!this.isLogin) {
        if (confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
          this.$router.push({ name: "LogIn" });
        }
        return;
      }

      this.tableIdx =
        this.restTableData < TABLE_SIZE
          ? this.houseDealsByPy.length
          : this.tableIdx + TABLE_SIZE;
    },
    onHideMore() {
      this.initShowMore();
    },
    initShowMore() {
      this.tableIdx = TABLE_SIZE;
    },
  },
};
</script>

<style scoped>
.filter-buttons {
  text-align: right;
}

.view-table {
  margin-top: var(--size-medium);
}

.show-more-button {
  margin: var(--size-regular) auto;
  display: block;
  text-align: center;
}

.show-more-button:hover {
  color: var(--color-dark-grey);
  animation: up-down 1500ms linear 3;
}

@keyframes up-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(var(--size-micro));
  }
}
</style>
