import { defineComponent, h, PropType, watch } from "vue";

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
  /*
    Text ID for chart
  */
  chartId: {
    type: String,
    default: "line-chart",
  },
  /**
   * background color for chart lines.
   */
  backgroundColor: {
    type: String,
    default: "#f87979",
    control: "color",
  },
  /**
   * Labels array
   */
  labels: {
    type: Array,
  },
  /**
   * Data array
   */
  data: {
    type: Array,
  },
  /**
   * Width of chart
   */
  width: {
    type: Number,
    default: 200,
  },
  /**
   * height of chart
   */
  height: {
    type: Number,
    default: 200,
  },
  /**
   * CSS for cusomizable look
   */
  cssClasses: {
    default: "",
    type: String,
  },
  /**
   * Styles for cusomizable look
   */
  styles: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: () => {},
  },
  /**
   * Plugins for cusomizable look
   */
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
    let chartData = {
      labels: props.labels,
      datasets: [
        {
          label: props.chartId,
          backgroundColor: props.backgroundColor,
          data: props.data,
        },
      ],
    };

    // Watch prop value change and assign to value 'chartData' for rerender
    watch(
      () => props.data,
      // eslint-disable-next-line no-unused-vars
      (newValue: any) => {
        chartData = {
          labels: props.labels,
          datasets: [
            {
              label: props.chartId,
              backgroundColor: props.backgroundColor,
              data: props.data,
            },
          ],
        };
      }
    );

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      // @ts-ignore Line false alarm for typings
      h(Line, {
        chartData: chartData,
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
