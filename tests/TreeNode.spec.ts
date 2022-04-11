import { createNode } from "./../src/state/Utility";

describe("LineChart", () => {
  it("renders a message", () => {
    const newAssetNode = createNode(
      { id: 1, name: "test", parentId: 0 },
      [],
      1
    );
    expect(newAssetNode).to.be.ok;
    expect(newAssetNode.state.selected).to.be.true;
    expect(newAssetNode.state.expanded).to.be.false;
  });
});
