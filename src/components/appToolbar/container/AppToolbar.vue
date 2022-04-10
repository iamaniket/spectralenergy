<template>
  <AppToolbar :title="title" color="green" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppToolbar from "../skeleton/AppToolbar.vue";

/*
  Container UI component for AppToolbar.
  This may contain business Logic. 
  Author @iamaniket
*/
export default defineComponent({
  name: "app-toolbar-container",

  components: {
    AppToolbar,
  },

  data() {
    return {
      title: "Spectral Energy",
      icon: "mdi-theme-light-dark",
    };
  },
});
</script>



