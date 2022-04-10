<template>
  <LineChart />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LineChart from "../skeleton/LineChart";

export default defineComponent({
  name: "line-chart-container",

  components: {
    LineChart,
  },

  data() {
    return {};
  },
});
</script>



