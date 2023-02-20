import React from "react";
interface IProp {
    title: string;
    orderCount: number;
    orderCountPer: number;
}

const ProgressBar = (props: IProp) => {
    return (
        <div className="space-y-[5px]">
            <div className="w-full flex-type3 text-[12px] text-[#18181B] font-[500] leading-[21px] ">
                <p>{props.title}</p>
                <p>{props.orderCount}</p>
            </div>
            <div className="w-full h-[5px] rounded-[71px] bg-[#F4F4F5] relative ">
                <div className={`absolute h-[5px] rounded-[71px] bg-[#3672DF]  `} style={{ width: `${props.orderCountPer}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
