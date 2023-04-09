import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";
import MazStatsDropddown from "./MazStatsDropddown";
import axios from "axios";
import fetchJson from "@/lib/fetchServer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors
);
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },

  elements: {
    point: {
      borderWidth: 5,

      hitRadius: 5,
    },
    line: {
      borderWidth: 2,
    },
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Line Chart - Multi Axis",
    },
    colors: {
      forceOverride: false,
    },
    legend: {
      display: true,
      fullSize: true,
      align: "start" as const,

      labels: {
        boxWidth: 10,
        boxHeight: 10,
        useBorderRadius: true,
        borderRadius: 5,
        color: "#301934",
        font: {
          size: 14,
          weight: "bolder",
        },
      },
    },
    tooltip: {
      //  xAlign:"left",
      displayColors: false,
      yAlign: "bottom" as const,
      titleAlign: "center" as const,
      backgroundColor: "#FFFFFF",
      borderColor: "#E4E4E7",
      borderWidth: 1,
      titleColor: "#71717A",
      titleFontSize: {
        size: 18,
        weight: "bold" as string,
      },
      bodyColor: "#18181B",
      padding: 10,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: true,
        display: true,
        drawTicks: false,
        tickColor: "red",
      },
      title: {
        color: "#525D72",
        padding: 10,
      },
    },
    y1: {
      display: false,
    },
    x: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
      title: {
        color: "#525D72",
      },
    },
    x1: {
      display: false,
    },
  },
};
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Customers",
      // data: [1000, 53, 200, 41, 100, 65, 40, 33, 53, 85, 41, 44],
      data: [1000, 53, 200, 41, 100, 65, 40, 33, 53, 85, 41, 44],
      borderColor: "#FF0000",

      lineTension: 0.3,
      fill: {
        target: "origin",
        above: "rgba(255,242,242,0.3)",
        opacity: 0.3,
        // Area will be red above the origin
        // And blue below the origin
      },
      backgroundColor: "#FF0000",
      yAxisID: "y",
      xAxisID: "x",
    },
    {
      label: "Orders",
      lineTension: 0.3,
      data: [33, 25, 35, 51, 3000, 76, 40, 33, 25, 35, 51, 54],
      borderColor: "#35C6F4",
      fill: {
        target: "origin",
        above: "#DFE7FF80", // Area will be red above the origin
        // And blue below the origin
      },
      backgroundColor: "#35C6F4",
      yAxisID: "y1",
      xAxisID: "x1",
    },
  ],
};

const StatGraph = () => {
  const [user_data, set_user_data] = useState();
  const [order_data, set_order_data] = useState();

  const stat_data = {
    labels,
    datasets: [
      {
        label: "Customers",
        // data: [1000, 53, 200, 41, 100, 65, 40, 33, 53, 85, 41, 44],
        data: user_data,
        borderColor: "#FF0000",

        lineTension: 0.3,
        fill: {
          target: "origin",
          above: "rgba(255,242,242,0.3)",
          opacity: 0.3,
          // Area will be red above the origin
          // And blue below the origin
        },
        backgroundColor: "#FF0000",
        yAxisID: "y",
        xAxisID: "x",
      },
      {
        label: "Orders",
        lineTension: 0.3,
        // data: [33, 25, 35, 51, 3000, 76, 40, 33, 25, 35, 51, 54],
        data: order_data,
        borderColor: "#35C6F4",
        fill: {
          target: "origin",
          above: "#DFE7FF80", // Area will be red above the origin
          // And blue below the origin
        },
        backgroundColor: "#35C6F4",
        yAxisID: "y1",
        xAxisID: "x1",
      },
    ],
  };
  useEffect(() => {
    const year = 2023;
    fetchJson(`/api/users/stats/${year}`).then((userscount) => {
      set_user_data(userscount.data);
    });
    fetchJson(`/api/orders/stats/${year}`).then((orderscount) => {
      set_order_data(orderscount.data);
    });
  }, []);
  return (
    <div className="w-2/3 flex-1 p-[10px] pt-[20px] mr-[1px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full relative ">
      <Line options={options} data={stat_data} />
      <div className="absolute top-[10px] right-[10px] ">
        <MazStatsDropddown
          options={[
            { label: "one year", value: "1" },
            { label: "two year", value: "2" },
          ]}
          header="year"
          selection={[]}
        />
      </div>
    </div>
  );
};

export default StatGraph;
