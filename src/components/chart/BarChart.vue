<template>
  <div class="chart-container">
    <canvas id="bar-chart" height="60"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "BarChart",
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
      const ctx = document.querySelector("#bar-chart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",

        data: {
          labels: this.options.labels,
          datasets: [
            {
              label: this.options.label,
              data: this.data,
              backgroundColor: "rgb(75, 192, 192)",
              barThickness: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              align: "start",
              text: this.options.label,
              color: "#000",
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
  max-width: 36rem;
  height: 7.5rem;
}
</style>
