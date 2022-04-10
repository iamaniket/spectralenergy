import { defineComponent, h, PropType } from "vue";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export const LinerChartProps = {
  chartId: {
    type: String,
    default: "line-chart",
  },
  /**
   * backgroundColor of the button.
   */
  backgroundColor: {
    type: String,
    default: "#f87979",
    control: "color",
  },
  labels: {
    type: Array,
  },
  data: {
    type: Array,
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 200,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: () => {},
  },
  plugins: {
    type: Array as PropType<Plugin<"line">[]>,
    default: () => [],
  },
};

export default defineComponent({
  name: "line-chart",
  components: {
    Line,
  },
  props: LinerChartProps,
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [
        {
          label: props.chartId,
          backgroundColor: props.backgroundColor,
          data: props.data,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      // @ts-ignore Line false alarm for typings
      h(Line, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
