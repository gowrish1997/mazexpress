import fetchJson from "@/lib/fetchServer";
import {
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import SelectYear from "./SelectYear";
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
            ticks: {
                suggestedMax: 100,
                suggestedMin:0
              },
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

const StatGraph = () => {
    const [user_data, set_user_data] = useState();
    const [order_data, set_order_data] = useState();
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );

    const setYearHandler = (value: number) => {
        setSelectedYear(value);
    };

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
                yAxisID: "y",
                xAxisID: "x",
            },
        ],
    };
    useEffect(() => {
        console.log(selectedYear);
        fetchJson(`/api/users/stats/${selectedYear}`).then((userscount) => {
            set_user_data(userscount.data);
        });
        fetchJson(`/api/orders/stats/${selectedYear}`).then((orderscount) => {
            set_order_data(orderscount.data);
        });
    }, [selectedYear]);
    return (
        <div className="w-2/3 flex-1 p-[10px] pt-[20px] mr-[1px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full relative ">
            <Line options={options} data={stat_data} />
            <div className="absolute top-[10px] right-[10px] ">
                <SelectYear onChange={setYearHandler} value={selectedYear} />
            </div>
        </div>
    );
};

export default StatGraph;
