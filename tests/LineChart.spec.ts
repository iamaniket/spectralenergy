import { mount } from "@cypress/vue";
import LineChart from "../src/components/lineChart/skeleton/LineChart";

describe("LineChart", () => {
  it("Canvas getting created", () => {
    const canvasId = "Dummy Data";
    mount(LineChart, {
      propsData: {
        width: 800,
        height: 400,
        chartId: "Dummy Data",
        backgroundColor: "f87979",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        data: [10, 20, 10, 34, 58, 78, 12],
      },
    }).then(() => {
      cy.wait(500);
      const canvas = document.getElementById(canvasId);
      expect(canvas).to.be.ok;
    });
  });

  it("Canvas height as per props", () => {
    const canvasId = "Dummy Data";
    mount(LineChart, {
      propsData: {
        width: 500,
        height: 150,
        chartId: "Dummy Data",
        backgroundColor: "f87979",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        data: [10, 20, 10, 34, 58, 78, 12],
      },
    }).then(() => {
      cy.wait(500);
      const canvas = document.getElementById(canvasId);
      const height = canvas?.clientHeight;
      expect(height).to.be.deep.equal(150);
    });
  });
});
