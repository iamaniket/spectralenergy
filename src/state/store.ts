import { createApp } from "vue";
import { createStore } from "vuex";
import { Asset } from "./Types/Asset";
import { Measurement } from "./Types/Measurement";
import { TreeNode } from "./Types/TreeNode";

type storeType = {
  selectedAsset: number;
  measurements: Array<Measurement>;
  assets: Array<Asset>;
  expandedAssets: Array<number>;
};

export const createNode = function (
  asset: Asset,
  expandedAssets: Array<number>,
  selectedAsset: number
): TreeNode {
  let expandedFlag = false;
  for (let i = 0; i < expandedAssets.length; i++) {
    if (expandedAssets[i] === asset.id) {
      expandedFlag = true;
      break;
    }
  }

  return {
    id: asset.id,
    text: asset.name,
    state: {
      selected: selectedAsset === asset.id,
      expanded: expandedFlag,
    },
    nodes: [],
    parentID: asset.parentId,
  };
};

export const store = createStore({
  state() {
    return {
      selectedAsset: -1,
      measurements: [],
      assets: [],
      expandedAssets: [],
    };
  },
  mutations: {
    setAssets(state: storeType, assets: Array<Asset>) {
      state.assets = assets;
    },
    setMeasurements(state: storeType, measurements: Array<Measurement>) {
      state.measurements = measurements;
    },
    selectAsset(state: storeType, assetId: number) {
      state.selectedAsset = assetId;
    },
    unsetAsset(state: storeType) {
      state.selectedAsset = -1;
    },
    expandAsset(state: storeType, assetId: number) {
      let assetPreset = -1;
      for (let i = 0; i < state.expandedAssets.length; i++) {
        if (state.expandedAssets[i] === assetId) {
          assetPreset = i;
          break;
        }
      }

      if (assetPreset != -1) {
        state.expandedAssets.splice(assetPreset, 1);
      } else {
        state.expandedAssets.push(assetId);
      }
    },
  },
  getters: {
    /*
      Dynamic asset node getter 
      Responsible for updating data related to selected and expanded assets
    */
    assetNodes(): Array<TreeNode> {
      const nodeArray: Array<TreeNode> = [];
      if (store.state.assets.length === 0) {
        return [];
      }

      // Create array of nodes
      store.state.assets.forEach((asset: Asset) => {
        nodeArray.push(
          createNode(
            asset,
            store.state.expandedAssets,
            store.state.selectedAsset
          )
        );
      });

      // Update nodes in array using parentID
      for (let i = nodeArray.length - 1; i >= 0; i--) {
        const treeNode = nodeArray[i];
        const parentID = treeNode.parentID;
        if (parentID) {
          const currentNode = nodeArray.find((node) => node.id === parentID);
          if (currentNode) {
            currentNode.nodes.push(treeNode);
          }
          nodeArray.splice(i, 1);
        }
      }

      return nodeArray;
    },
  },
});
