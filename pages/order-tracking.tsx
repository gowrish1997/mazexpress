import React, { useEffect, useState } from "react";
import Image from "next/image";
import PageHeader from "@/components/orders/PageHeader";
import Layout from "@/components/layout";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import MultiStepProgressBar from "@/components/ordertracking/MultiStepProgressBar";
import WarehouseTracking from "@/components/ordertracking/WarehouseTracking";
const allOrder = [
    {
        product: "bat",
        maxTrackingId: "06MAZ58946",
    },
    {
        product: "bat",
        maxTrackingId: "06MAZ58946",
    },
    {
        product: "bat",
        maxTrackingId: "06MAZ58946",
    },
];



const OrderTracking = () => {
    const [packageStatus, setPackageStatus] = useState(5);
 

    return (
        <>
            <PageHeader content="Order Tracking" className="border-none pb-[10px]" />
            <Layout>
                <div className="flex-type2 w-full ">
                    <div className="flex-type6 w-3/4 pr-[20px] gap-y-[35px] ">
                        <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px]">
                            <Image src="/blueexclamatory.png" alt="icon" width={16} height={16} />
                            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                                Here is a link to some fake information that contains crucial information, <span className="text-[#3672DF]">Link here →</span>
                            </p>
                        </div>
                        <div className="font-[500]">
                            <p className="text-[14px] text-[#2B2B2B] leading-[21px]">Tracking</p>
                            <p className="text-[12px] text-[#8794AD] leading-[17px]">Some fake information lines here</p>
                        </div>

                        <div className="flex-type2 justify-start w-[100%] space-x-[50px] ">
                            <MultiStepProgressBar stepPercentage={packageStatus} />
                            <div className="flex-type6 text-[#525D72] font-[500] leading-[21px] text-[14px] ">
                                <div className="flex-type6 gap-y-[5px] mt-[20px]  ">
                                    <p className={`${packageStatus >= 0 ? "text-[#2B2B2B] font-[600] " : ""}`}>Source website</p>
                                    <button
                                        className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                            packageStatus > 0 ? "text-[green] bg-[#DEFDED]" : "text-[#FFBA00] bg-[#FFF8E3]"
                                        }`}
                                    >
                                        {packageStatus > 0 ? "Delivered" : "Received"}
                                    </button>
                                </div>
                                <div className="flex-type6 gap-y-[5px] mt-[55px] ">
                                    <p className={`${packageStatus >= 1 ? "text-[#2B2B2B] font-[600] " : ""}`}>Warehouse</p>
                                    <button
                                        className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                            packageStatus >= 1 ? (packageStatus > 3 ? "text-[green] bg-[#DEFDED] " : " text-[#FFBA00] bg-[#FFF8E3]") : ""
                                        }`}
                                    >
                                        {" "}
                                        {packageStatus >= 1 ? (packageStatus >3 ? "Completed" : "Received") : "Pending"}
                                    </button>
                                    <WarehouseTracking status={packageStatus} />
                                </div>
                                <div className="flex-type6 gap-y-[5px] mt-[25px] ">
                                    <p className={`${packageStatus >= 4 ? "text-[#2B2B2B] font-[600] " : ""}`}>Out for delivery</p>
                                    <button
                                        className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                            packageStatus >= 4 ? (packageStatus == 4 ? "text-[#FFBA00] bg-[#FFF8E3] " : "text-[green] bg-[#DEFDED]") : ""
                                        }`}
                                    >
                                        {packageStatus >= 4 ? (packageStatus == 4 ? " Received" : "Completed") : "Pending"}
                                    </button>
                                </div>
                                <div className="flex-type6 gap-y-[5px] mt-[110px] ">
                                    <p className={`${packageStatus >= 5 ? "text-[#2B2B2B] font-[600] " : ""}`}>Delivered</p>
                                    <button
                                        className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                            packageStatus == 5 ? "text-[#FFBA00] bg-[#FFF8E3]" : ""
                                        }`}
                                    >
                                        {packageStatus == 5 ? "Enjoy" : "pending"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 h-full pl-[20px] border-l-[0.4px] border-l-[#BBC2CF] space-y-[5px] ">
                        <div className="text-[#2B2B2B] text-[14px] leading-[21px] font-[500] border-b-[1px] border-b-[#BBC2CF] pb-[20px] ">MAZ Tracking ID</div>
                        <div className="space-y-[10px]">
                            {allOrder.map((data) => {
                                return (
                                    <p className="text-[#525D72] text-[14px] font-[500] leading-[21px] px-[5px] py-[15px] cursor-pointer hover:text-[#2B2B2B] hover:bg-[#EDF5F9] rounded-[4px] ">
                                        {data.maxTrackingId}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default OrderTracking;
