/*
 Tree node structure
*/
export interface TreeNode {
  id: number;
  text: string;
  state: { selected: boolean; expanded: boolean };
  nodes: Array<TreeNode>;
  parentID: undefined | number;
}
