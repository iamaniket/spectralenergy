<template>
  <div>
    <v-card width="400" elevation="4" style="height: 100vh; overflow: hidden">
      <Tree
        id="my-tree-id"
        ref="my-tree-ref"
        :nodes="items"
        :custom-options="myCustomOptions"
        :custom-styles="myCustomStyles"
        style="padding: 20px"
      ></Tree>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//@ts-ignore js lib TS are not avalable
import Tree from "vuejs-tree";

export const AppSidebarProps = {
  /*
    Items for Sidebar
  */
  items: {
    type: Array,
    required: true,
  },
};

export default defineComponent({
  name: "app-sidebar",
  components: {
    Tree,
  },
  props: AppSidebarProps,

  data() {
    return {
      myCustomOptions: {
        treeEvents: {
          expanded: {
            state: true,
            fn: null,
          },
          collapsed: {
            state: false,
            fn: null,
          },
          selected: {
            state: false,
            fn: null,
          },
          checked: {
            state: false,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
            fn: (item: any) => {
              this.$emit("onRowExpand", item);
            },
          },
          selected: {
            state: true,
            fn: (item: any) => {
              this.$emit("onRowSelect", item);
            },
          },
          checked: {
            state: false,
            fn: null,
          },
          editableName: {
            state: true,
            fn: (item: any) => {
              this.$emit("onRowSelect", item);
            },
            calledEvent: null,
          },
        },
        addNode: { state: false, fn: null, appearOnHover: false },
        editNode: { state: false, fn: null, appearOnHover: true },
        deleteNode: { state: false, fn: null, appearOnHover: true },
        showTags: true,
      },
      myCustomStyles: {
        tree: {
          width: "50px",
          height: "auto",
          maxHeight: "300px",
          overflowY: "auto",
          display: "inline-block",
        },
        row: {
          width: "100px",
          cursor: "pointer",
          child: {
            height: "35px",
          },
        },
        selectIcon: {
          class: "custom_class",
          style: {
            color: "#007AD5",
          },
          active: {
            class: "custom_class",
            style: {
              color: "#2ECC71",
            },
          },
        },
        text: {
          style: {},
          active: {
            style: {
              "font-weight": "bold",
              color: "#2ECC71",
              paddingLeft: "10px",
            },
          },
        },
      },
    };
  },
});
</script>
