<template>
  <div>
    <v-app-bar elevation="3" :color="color">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-app-bar>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export const AppToolbarProps = {
  /*
    Title to be given to Appbar
  */
  title: {
    type: String,
    required: true,
  },
  /*
  background color for UI
  */
  color: {
    type: String,
    default: "blue",
    required: true,
  },
};

/*
  Skeleton UI component for AppToolbar.
  Author @iamaniket
*/
export default defineComponent({
  name: "app-toolbar",
  props: AppToolbarProps
});
</script>
