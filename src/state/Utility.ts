import { Asset } from "./Types/Asset";
import { TreeNode } from "./Types/TreeNode";

/**
 * create tree node
 * @param  {Asset} asset
 * @param  {Array<number>} expandedAssets
 * @param  {number} selectedAsset
 * @returns TreeNode
 */
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
