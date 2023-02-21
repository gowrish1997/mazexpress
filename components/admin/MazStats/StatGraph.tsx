import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Colors } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Colors);
import { Line } from "react-chartjs-2";
import MazStatsDropddown from "./MazStatsDropddown";

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
            align: "left" as string,

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
            yAlign: "bottom" as string,
            titleAlign: "center" as string,
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
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
    labels,
    datasets: [
        {
            label: "Customers",
            data: [33, 53, 85, 41, 44, 65, 40, 33, 53, 85, 41, 44, 65],
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
            data: [33, 25, 35, 51, 54, 76, 40, 33, 25, 35, 51, 54, 76],
            borderColor: "#3672DF",
            fill: {
                target: "origin",
                above: "#DFE7FF80", // Area will be red above the origin
                // And blue below the origin
            },
            backgroundColor: "#3672DF",
            yAxisID: "y1",
            xAxisID: "x1",
        },
    ],
};

const StatGraph = () => {
    return (
        <div className="w-2/3 flex-1 p-[10px] pt-[20px] mr-[1px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full relative ">
            <Line options={options} data={data} />
            <div className="absolute top-[10px] right-[10px] ">
                <MazStatsDropddown options={[{label:'one year',value:'1'},{label:"two year",value:'2'}]} type='year' />
            </div>
        </div>
    );
};

export default StatGraph;
