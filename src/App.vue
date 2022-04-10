<template>
  <v-app>
    <v-main>
      <AppToolbar />
      <AppSidebar v-show="drawerFlag" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppToolbar from "./components/appToolbar/";
import AppSidebar from "./components/appSidebar/";
import { getAssetData, getMeasurementData } from "./services/DataService";

export default defineComponent({
  name: "App",

  components: {
    AppSidebar,
    AppToolbar,
  },

  computed: {
    drawerFlag() {
      return true;
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
