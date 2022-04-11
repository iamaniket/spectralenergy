// In real world scenario, We need API's to fetch and store the data
// Here we are just loading the data form JSON File

import { store } from "@/state/store";

export const getAssetData = async function () {
  const result = await fetchData("assets.json");
  if (result) {
    store.commit("setAssets", result);
  } else {
    console.error("something went wrong fetching assets");
  }
};

export const getMeasurementData = async function () {
  const result = await fetchData("measurements.json");
  if (result) {
    store.commit("setMeasurements", result);
  } else {
    console.error("something went wrong fetching measurements");
  }
};

const fetchData = (APIEndPoint: string): Promise<Array<any> | undefined> => {
  try {
    return new Promise((resolve) => {
      fetch("data/" + APIEndPoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return resolve(response.json());
        })
        .then(function (myJson: any) {
          return resolve(myJson);
        });
    });
  } catch (err) {
    return new Promise((resolve, reject) => {
      console.error(err);
      reject(undefined);
    });
  }
};
