import React from "react";

import ProgressBar1 from "./ProgressBar";
const OrdersTotalCountBar = () => {
    return (
        <div className="p-[10px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full space-y-[30px]" style={{width:'calc(33% - 2px)'}}>
            <h1 className="text-[14px] text-[#18181B] font-[600] leading-[24px] ">MAZ Stats</h1>
            <div className="space-y-[25px]">
                <ProgressBar1 title="Delivered Orders" orderCount={20000} orderCountPer={80} />
                <ProgressBar1 title="In Transit" orderCount={200} orderCountPer={60} />
                <ProgressBar1 title="Out For Delivery" orderCount={10000} orderCountPer={90} />
                <ProgressBar1 title="At Warehouse" orderCount={30000} orderCountPer={80} />
            </div>
        </div>
    );
};

export default OrdersTotalCountBar;
