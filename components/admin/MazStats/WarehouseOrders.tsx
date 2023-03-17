import React, { useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";
const options = [
  { value: "", label: "All" },
  { value: "benghazi", label: "Benghazi" },
  { value: "misrata", label: "Misrata" },
  { value: "tripoli", label: "Tripoli" },
];

const WarehouseOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [statusSelection, setStatusSelection] = useState<string[]>([]);
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    status: statusSelection,
    count: true,
    // count_all: true
  });

  const wareHouseChangeHanlder = (value: string | number) => {
    // console.log(value);

    setStatusSelection((prev) => {
      if (prev.includes(value as string)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value as string];
      }
    });
  };

  return (
    <StatCard>
      <div className="w-full flex-type3">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Warehouse Orders
        </p>
        <MazStatsDropddown
          options={options}
          header="city"
          onChange={wareHouseChangeHanlder}
          selection={statusSelection}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {orders as number}
      </p>
    </StatCard>
  );
};

export default WarehouseOrders;
