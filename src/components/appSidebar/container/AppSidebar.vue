<template>
  <AppSidebar
    :items="items"
    @onRowSelect="onRowSelect"
    @onRowExpand="onRowExpand"
  />
</template>

<script lang="ts">
import { store } from "@/state/store";
import { TreeNode } from "@/state/Types/TreeNode";
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
      return store.getters["assetNodes"];
    },
  },
  data: () => ({
    onRowSelect: (row: TreeNode) => {
      store.commit("selectAsset", row.id);
    },
    onRowExpand: (row: TreeNode) => {
      store.commit("expandAsset", row.id);
    },
  }),
});
</script>



