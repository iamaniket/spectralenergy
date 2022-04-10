import LineChart, { LinerChartProps } from "./skeleton/LineChart";

export default {
  title: "LineChart",
  component: LineChart,
  argTypes: LinerChartProps,
};

const Template = (args) => ({
  components: { LineChart },
  setup() {
    return { args };
  },
  template: '<line-chart v-bind="args" />',
});

export const Dummy = Template.bind({});
Dummy.args = {
  width: 800,
  height: 400,
  chartId: "Dummy Data",
  backgroundColor: "f87979",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  data: [10, 20, 10, 34, 58, 78, 12],
};
