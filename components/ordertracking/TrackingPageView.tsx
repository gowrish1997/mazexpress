import React from "react";
import PackageTrackingView from "./PackageTrackingView";
import WarehouseTracking from "./WarehouseTracking";

const TrackingPageView = (props: { packageStatus: number }) => {
    return (
        <>
            <div className="font-[500] space-y-[5px]">
                <p className="text-[14px] text-[#2B2B2B] leading-[21px]">Tracking</p>
            </div>

            <div className="flex-type2 justify-start w-[100%] space-x-[50px] ">
                <PackageTrackingView packageStatus={props.packageStatus} />
                <div className="flex-type6 text-[#525D72] font-[500] leading-[21px] text-[14px] ">
                    <div className="flex-type6 gap-y-[5px] mt-[20px]  ">
                        <p className={`${props.packageStatus >= 0 ? "text-[#2B2B2B] font-[600] " : ""}`}>Source website</p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus > 0 ? "text-[green] bg-[#DEFDED]" : "text-[#FFBA00] bg-[#FFF8E3]"
                            }`}
                        >
                            {props.packageStatus > 0 ? "Delivered" : "Received"}
                        </button>
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[55px] ">
                        <p className={`${props.packageStatus >= 1 ? "text-[#2B2B2B] font-[600] " : ""}`}>Warehouse</p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus >= 1 ? (props.packageStatus > 3 ? "text-[green] bg-[#DEFDED] " : " text-[#FFBA00] bg-[#FFF8E3]") : ""
                            }`}
                        >
                            {" "}
                            {props.packageStatus >= 1 ? (props.packageStatus > 3 ? "Completed" : "Received") : "Pending"}
                        </button>
                        <WarehouseTracking packageStatus={props.packageStatus} />
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[25px] ">
                        <p className={`${props.packageStatus >= 4 ? "text-[#2B2B2B] font-[600] " : ""}`}>Out for delivery</p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus >= 4 ? (props.packageStatus == 4 ? "text-[#FFBA00] bg-[#FFF8E3] " : "text-[green] bg-[#DEFDED]") : ""
                            }`}
                        >
                            {props.packageStatus >= 4 ? (props.packageStatus == 4 ? " Received" : "Completed") : "Pending"}
                        </button>
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[110px] ">
                        <p className={`${props.packageStatus >= 5 ? "text-[#2B2B2B] font-[600] " : ""}`}>Delivered</p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${props.packageStatus == 5 ? "text-[#FFBA00] bg-[#FFF8E3]" : ""}`}
                        >
                            {props.packageStatus == 5 ? "Enjoy" : "pending"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrackingPageView;
