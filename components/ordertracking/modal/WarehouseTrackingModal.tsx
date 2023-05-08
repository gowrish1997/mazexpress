import React from "react";
import WarehouseTracking from "../WarehouseTracking";
import { Tracking } from "@/models/tracking.model";

interface IProp {
    packageStatus: number;
    trackingDetail: Tracking[];
    close: () => void;
}

const WarehouseTrackingModal = (props: IProp) => {
    return (
        <div className=" fixed top-0 left-0 h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
            <div className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px]  gap-y-[15px]">
                <p className="text-[22px] ">
                    Warehouse tracking
                </p>
                <WarehouseTracking
                    packageStatus={props.packageStatus}
                    trackingDetail={props.trackingDetail}
                />
                <button
                    className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center bg-[#35C6F4] "
                    onClick={() => props.close()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default WarehouseTrackingModal;
