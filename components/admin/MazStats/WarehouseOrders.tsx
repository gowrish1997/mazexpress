import React, { useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";
const options = [{ value: "istanbul", label: "istanbul" }];
const WarehouseOrders = () => {

  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    status: ["at-warehouse"],
    count: true,
    count_all: true
  });
    const wareHouseChangeHanlder = (value: string) => {
        console.log(value);
    };

  return (
    <StatCard>
      <div className="w-full flex-type3">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Warehouse Orders
        </p>
        <MazStatsDropddown
          options={options}
          type="warehouse"
          onChange={wareHouseChangeHanlder}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {orders as number}
      </p>
    </StatCard>
  );
};

export default WarehouseOrders;
