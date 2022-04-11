<template>
  <v-app>
    <v-main>
      <AppToolbar />
      <v-container class="grey" style="max-width: 100%; padding: 0px">
        <v-row>
          <v-col md="2">
            <AppSidebar v-show="drawerFlag" />
          </v-col>
          <v-col md="10">
            <LineChart v-if="assetSelected" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppToolbar from "./components/appToolbar/";
import LineChart from "./components/lineChart";
import AppSidebar from "./components/appSidebar/";
import { getAssetData, getMeasurementData } from "./services/DataService";
import { store } from "./state/store";

export default defineComponent({
  name: "App",

  components: {
    AppSidebar,
    AppToolbar,
    LineChart,
  },

  computed: {
    drawerFlag() {
      return true;
    },
    assetSelected() {
      return store.state.selectedAsset != -1;
    },
  },
  mounted() {
    // Fetch and store Application data
    getMeasurementData();
    getAssetData();
  },
  data() {
    return {
      //
    };
  },
});
</script>
