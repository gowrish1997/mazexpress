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
                    <div className="w-3/4 pr-[20px] ">
                        <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                            <Image src="/blueexclamatory.png" alt="icon" width={16} height={16} />
                            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                                Here is a link to some fake information that contains crucial information, <span className="text-[#3672DF]">Link here →</span>
                            </p>
                        </div>
                        {/* <ReactHookFormInput label="MAZ Tracking ID" name="mazTrackingId" type="string" parentClassName="mt-[20px]" inputClassName="h-[46px]" /> */}
                        <div className="flex flex-row justify-start items-start relative ">
                        <MultiStepProgressBar  />
                        </div>
                       
                    </div>
                    <div className="w-1/4 pl-[20px] border-l-[0.4px] border-l-[#BBC2CF] ">kotari</div>
                </div>
            </Layout>
        </>
    );
};

export default OrderTracking;
