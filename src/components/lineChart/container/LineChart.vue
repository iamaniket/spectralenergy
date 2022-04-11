<template>
  <LineChart
    :height="height"
    :chartId="chartId"
    :labels="labels"
    :data="data"
  />
  <div style="text-align: center; padding-top: 20px">{{ message }}</div>
</template>

<script lang="ts">
import { store } from "@/state/store";
import { defineComponent } from "vue";
import LineChart from "../skeleton/LineChart";

export default defineComponent({
  name: "line-chart-container",

  components: {
    LineChart,
  },
  computed: {
    message() {
      const result = store.getters["assetHasData"];
      if (result) return "";
      else
        return "The asset has no data. Instead the sum of it's children is used";
    },
    labels() {
      const result = store.getters["measurementDates"];
      return result;
    },
    chartId() {
      return "Asset " + store.state.selectedAsset;
    },
    data() {
      const result = store.getters["measurementNumber"];
      return result;
    },
  },

  data() {
    return {
      width: 100,
      height: 1000,
      backgroundColor: "f87979",
    };
  },
});
</script>



