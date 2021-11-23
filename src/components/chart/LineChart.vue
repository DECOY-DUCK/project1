<template>
  <div class="chart-container">
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
    options: {
      labels: Array,
      opts: Object,
      label: String,
    },
    data: Array,
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    data() {
      this.fillData();
    },
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.querySelector("#line-chart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.options.labels,
          datasets: [
            {
              label: this.options.label,
              data: this.data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
              spanGaps: true,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          ...this.options.opts,
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  width: 100%;
}
</style>
