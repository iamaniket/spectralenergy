<template>
  <AppSidebar
    :items="items"
    color="blue"
    @onRowSelect="onRowSelect"
    @onRowExpand="onRowExpand"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSidebar from "../skeleton/AppSidebar.vue";

/*
  Container UI component for AppSidebar.
  This may contain business Logic. 
  Author @iamaniket
*/
export default defineComponent({
  name: "app-sidebar-container",
  components: {
    AppSidebar,
  },
  computed: {
    items() {
      return [
        {
          text: "Root 1",
          state: { selected: false, expanded: false },
          nodes: [
            {
              text: "Child 1",
              state: { selected: false, expanded: false },
              nodes: [
                {
                  text: "Grandchild 1",
                  state: { selected: false, expanded: false },
                },
                {
                  text: "Grandchild 2",
                  state: { selected: false, expanded: false },
                },
              ],
            },
            {
              text: "Child 2",
              state: { selected: false, expanded: false },
            },
          ],
        },
        {
          text: "Root 2",
          state: { selected: false, expanded: false },
        },
      ];
    },
  },
  data: () => ({
    onRowSelect: (row: any) => {
      console.log("onRowSelect");
      console.log(row);
    },
    onRowExpand: (row: any) => {
      console.log("onRowSelect");
      console.log(row);
    },
  }),
});
</script>



