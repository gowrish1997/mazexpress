import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";

const options = [
  // { value: "", label: "all" },
  { value: "at-warehouse", label: "At warehouse" },
  { value: "in-transit", label: "In transit" },
  { value: "out-for-delivery", label: "Out for delivery" },
  { value: "delivered", label: "Delivered" },
];

const TotalOrders = () => {
  const [statusSelection, setStatusSelection] = useState<(string | number)[]>([]);
  const { orders: totalOrders, mutateOrders: mutateTotalOrders } = useOrders({
    // count_all: true,
    count: true,
    status: (statusSelection as string[])
  });

  const statusChangeHandler = (value: string | number) => {
    // console.log(value);
    setStatusSelection((prev) => {
      if (prev.includes(value)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    console.log(totalOrders)
  }, [statusSelection])

  return (
    <StatCard>
      <div className="w-full flex-type3">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Total Orders
        </p>
        <MazStatsDropddown
          options={options}
          header="status"
          onChange={statusChangeHandler}
          selection={statusSelection}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {totalOrders as number}
      </p>
    </StatCard>
  );
};

export default TotalOrders;
