import React, { useEffect, useState } from "react";
import Head from "next/head";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
import { IOrderResponse } from "@/models/order.interface";

import AdminOptionDropDown from "./AdminOptionDropDown";
interface IProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[];
    filterByDate: (value: Date | string) => void;
}

const warehouse = ["istanbul"];

const LiveOrderPageHeader = (props: IProp) => {
    const [packageStatusDropDownOptoin, setPackageStatusDropDownOptoin] = useState<string[]>([]);
    const [warehousesDropDownOptoin, setWarehousesDropdownOption] = useState<string[]>(warehouse);

    useEffect(() => {
        const packageStatus = new Set();
        if (props.allLiveOrders) {
            for (const object of props.allLiveOrders) {
                packageStatus.add(object.status_orders);
            }

            setPackageStatusDropDownOptoin((prev) => {
                return ["all status", ...(Array.from(packageStatus) as string[])];
            });
        }
    }, [props.allLiveOrders]);

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative z-10 "}>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} filterByDate={props.filterByDate} />

                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px] ">
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        <FilterOptionDropDown options={packageStatusDropDownOptoin} type="packageStatus" onChange={props.onChangeStatus!} />
                        <FilterOptionDropDown options={warehousesDropDownOptoin} type="warehouse" />

                        <AdminOptionDropDown disabled={!props.selectedOrder?.length} orders={props.allLiveOrders} />
                    </div>
                )}
            </div>
        </>
    );
};

export default LiveOrderPageHeader;

// { backgroundColor: "#BBC2CF", color: "#FFFFFF" }
