import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";
import useOrderCount from "@/lib/hooks/useOrderCount";
const options = [
  { value: "all", label: "All" },
  { value: "BNG", label: "Benghazi" },
  { value: "MIS", label: "Misrata" },
  { value: "TRI", label: "Tripoli" },
];

const WarehouseOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [citySelection, setCitySelection] = useState<string[]>([
    "TRI",
    "MIS",
    "BNG",
  ]);
  const { orderCount, mutateOrderCount, orderCountIsLoading, orderCountError } =
    useOrderCount({
      city: citySelection.length > 0 ? citySelection : undefined,
    });

  const wareHouseChangeHanlder = (value: string | number) => {
    if (value === "all") {
      // set all
      if (citySelection.length === 3) {
        // unselect
        setCitySelection([]);
      } else {
        setCitySelection(["TRI", "MIS", "BNG"]);
      }
    } else {
      setCitySelection((prev) => {
        if (prev.includes(value as string)) {
          return prev.filter((el) => el !== value);
        } else {
          return [...prev, value as string];
        }
      });
    }
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
