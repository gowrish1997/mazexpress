import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";
import useOrderCount from "@/lib/hooks/useOrderCount";
const options = [
  { value: "", label: "All" },
  { value: "BNG", label: "Benghazi" },
  { value: "MIS", label: "Misrata" },
  { value: "TRI", label: "Tripoli" },
];

const WarehouseOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [citySelection, setCitySelection] = useState<string[]>([]);
  const { orderCount, mutateOrderCount, orderCountIsLoading, orderCountError } =
    useOrderCount({
      city: citySelection,
    });

  const wareHouseChangeHanlder = (value: string | number) => {
    // console.log(value);

    setCitySelection((prev) => {
      if (prev.includes(value as string)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value as string];
      }
    });
  };

  useEffect(() => {
    if (citySelection.length === 0) {
      setCitySelection(["TRI", "MIS", "BNG"]);
    }
  }, [citySelection]);

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
          selection={citySelection}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {orderCount}
      </p>
    </StatCard>
  );
};

export default WarehouseOrders;
