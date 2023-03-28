import React from "react";
import { Tracking } from "@/models/tracking.model";
import TimeCard from "./TimeCard";
const TimeTracking = (props: { trackingDetail: Tracking[] }) => {
    return (
        <div className="flex-type6 text-[#525D72] font-[500] leading-[21px] text-[14px] ">
            <div className="flex-type6 gap-y-[5px] mt-[20px]  ">
                <TimeCard stage={0} trackingDetail={props.trackingDetail} />
            </div>
            <div className="flex-type6 gap-y-[5px] mt-[55px] ">
                <TimeCard stage={1} trackingDetail={props.trackingDetail} />
            </div>
            <div className="flex-type6 gap-y-[5px] mt-[25px] ">
                <TimeCard stage={4} trackingDetail={props.trackingDetail} />
            </div>
            <div className="flex-type6 gap-y-[5px] mt-[110px] ">
                <TimeCard stage={5} trackingDetail={props.trackingDetail} />
            </div>
        </div>
    );
};

export default TimeTracking;
