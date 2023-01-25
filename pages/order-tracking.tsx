import React from "react";
import Image from "next/image";
import PageHeader from "@/components/orders/PageHeader";
import Layout from "@/components/layout";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import MultiStepProgressBar from "@/components/ordertracking/ProgressBar";
const OrderTracking = () => {
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

                        <div className="flex-type2 space-x-[50px] ">
                            <MultiStepProgressBar />
                            <div className="flex-type6 gap-y-[85px] text-[#525D72] font-[500] leading-[21px] text-[14px] ">
                                <div className="">
                                    <p className="">Source website</p>
                                    <button className="text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[5px] ">delivered</button>
                                </div>
                                <div className="">
                                    <p>Warehouse</p>
                                    <button className="text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[5px]  ">received</button>
                                </div>
                                <div className="">
                                    <p>Out for delivery</p>
                                    <button className="text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[5px]  ">pending</button>
                                </div>
                                <div className="">
                                    <p>Delivered</p>
                                    <button className="text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[5px]  ">pending</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4 pl-[20px] border-l-[0.4px] border-l-[#BBC2CF] ">kotari</div>
                </div>
            </Layout>
        </>
    );
};

export default OrderTracking;
