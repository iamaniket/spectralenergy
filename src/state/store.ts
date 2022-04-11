import { createStore } from "vuex";
import { Asset } from "./Types/Asset";
import { Measurement } from "./Types/Measurement";
import { TreeNode } from "./Types/TreeNode";
import { createNode } from "./Utility";

type storeType = {
  selectedAsset: number;
  measurements: Array<Measurement>;
  assets: Array<Asset>;
  expandedAssets: Array<number>;
};

/**
 * Get Measurement Object from assetId
 * @param  {number} assetId
 * @returns undefined| Measurement
 */
const getMeasurementObject = function (
  assetId: number
): undefined | Measurement {
  let data;
  for (let i = 0; i < store.state.measurements.length; i++) {
    if (store.state.measurements[i].assetId === assetId) {
      data = store.state.measurements[i];
      break;
    }
  }
  return data;
};

/**
 * Get Children from assetId
 * @param  {number} assetId
 * @returns Array os asset
 */
const getChildren = function (assetId: number): Array<Asset> {
  const childAssets: Array<Asset> = [];
  for (let i = 0; i < store.state.assets.length; i++) {
    const asset = store.state.assets[i];
    if (asset.parentId === assetId) {
      childAssets.push(asset);
    }
  }
  return childAssets;
};

/**
 * Get Measurement Data for asset
 * If not present then calculate it from it's children.
 * @param  {number} assetId
 * @returns Measurement
 */
const getMeasurementData = function (assetId: number): Measurement | undefined {
  const data = getMeasurementObject(assetId);
  if (data) {
    return data;
  }
  const childrens = getChildren(assetId);
  let mergedDataObject: Measurement | undefined;
  for (let i = 0; i < childrens.length; i++) {
    if (mergedDataObject) {
      const tempObject = getMeasurementData(childrens[i].id);
      if (tempObject) {
        Object.keys(tempObject.measurements).forEach((key: string) => {
          //@ts-ignore
          const currentValue = mergedDataObject!.measurements[key] as Number;
          // @ts-ignore number any bypass
          const tempValue = tempObject.measurements[key];
          if (currentValue) {
            // @ts-ignore
            mergedDataObject!.measurements[key] = currentValue + tempValue;
          } else {
            // @ts-ignore number any bypass
            mergedDataObject!.measurements[key] = tempValue;
          }
        });
      }
    } else {
      mergedDataObject = JSON.parse(
        JSON.stringify(getMeasurementData(childrens[i].id))
      );
    }
  }

  return mergedDataObject;
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
    assetHasData(): boolean {
      if (store.state.selectedAsset === -1) {
        return false;
      }
      if (store.state.measurements.length === 0) {
        return false;
      }

      const data = getMeasurementObject(store.state.selectedAsset);

      return data ? true : false;
    },
    measurementNumber(): Array<number> {
      if (store.state.selectedAsset === -1) {
        return [];
      }
      if (store.state.measurements.length === 0) {
        return [];
      }

      const data = getMeasurementData(store.state.selectedAsset);
      // If data is present then parse and return the data
      if (data) {
        const resultArray = Object.values(data.measurements);
        return resultArray;
      }
      return [];
    },
    measurementDates(): Array<string> {
      if (store.state.selectedAsset === -1) {
        return [];
      }
      if (store.state.measurements.length === 0) {
        return [];
      }
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const data = getMeasurementData(store.state.selectedAsset);
      // If data is present then parse and return the data
      if (data) {
        const resultArray = Object.keys(data.measurements);
        const finalDateArray: Array<string> = [];
        resultArray.forEach((element) => {
          const newDate = new Date(element);
          finalDateArray.push(
            monthNames[newDate.getMonth()] + " '" + newDate.getFullYear()
          );
        });
        return finalDateArray;
      }
      // else find the data for children

      return [];
    },
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
