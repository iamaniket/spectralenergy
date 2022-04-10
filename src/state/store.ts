import { createApp } from "vue";
import { createStore } from "vuex";
import { Asset } from "./Types/Asset";
import { Measurement } from "./Types/Measurement";

type storeType = {
  selectedAsset: number;
  measurements: Array<Measurement>;
  assets: Array<Asset>;
};

export const store = createStore({
  state() {
    return {
      selectedAsset: -1,
      measurements: [],
      assets: [],
    };
  },
  mutations: {
    setAssets(state: storeType, assets: Array<Asset>) {
      console.log(assets);
      state.assets = assets;
    },
    setMeasurements(state: storeType, measurements: Array<Measurement>) {
      console.log(measurements);
      state.measurements = measurements;
    },
    selectAsset(state: storeType, assetId: number) {
      console.log(assetId);
      state.selectedAsset = assetId;
    },
    unsetAsset(state: storeType) {
      state.selectedAsset = -1;
    },
  },
});
