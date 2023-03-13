import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";

const options = [
  { value: "", label: "all age" },
  { value: "10-20", label: "10-20" },
  { value: "10-20", label: "10-20" },
  { value: "10-20", label: "10-20" },
];

const TotalOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const { orders: totalOrders, mutateOrders: mutateTotalOrders } = useOrders({
    count_all: true,
    count: true
  });

  const dateChangeHandler = (value: string | number) => {
    console.log(value);
  };

  return (
    <StatCard>
      <div className="w-full flex-type3">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Total Orders
        </p>
        <MazStatsDropddown
          options={options}
          type="orders"
          onChange={dateChangeHandler}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {totalOrders as number}
      </p>
    </StatCard>
  );
};

export default TotalOrders;
