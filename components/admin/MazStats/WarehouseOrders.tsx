import React, { useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
const options = [{ value: "istanbul", label: "istanbul" }];
const WarehouseOrders = () => {
    const wareHouseChangeHanlder = (value: string) => {
        console.log(value);
    };

    return (
        <StatCard>
            <div className="w-full flex-type3">
                <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">Warehouse Orders</p>
                <MazStatsDropddown options={options} type="warehouse" onChange={wareHouseChangeHanlder} />
            </div>
            <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">1000</p>
        </StatCard>
    );
};

export default WarehouseOrders;
