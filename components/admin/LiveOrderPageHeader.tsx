import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
import { IOrderResponse } from "@/models/order.interface";
import ReactPaginateComponent from "./ReactPaginate";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";

import AdminOptionDropDown from "./AdminOptionDropDown";
interface IProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string[]) => void;
    itemPerPageHandler?: (value: string | number) => void;
    selectedOrder?: string[];
    allLiveOrders: number;
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
}

const warehouse = ["istanbul"];

const LiveOrderPageHeader = (props: IProp) => {
    const [warehousesDropDownOptoin, setWarehousesDropdownOption] = useState<string[]>(warehouse);

    const perPageOptions = useMemo(() => {
        return [
            { value: "5", label: "default" },
            { value: "10", label: "10" },
            { value: "15", label: "15" },
            { value: 20, label: 20 },
            { value: 25, label: 25 },
        ];
    }, []);
    const packageStatusDropDownOptoin = useMemo(() => {
       return  ["all status", "pending", "in-transit", "at-warehouse", "delivered"];
    }, []);

    // useEffect(() => {
    //     const packageStatus = new Set();
    //     if (props.allLiveOrders) {
    //         for (const object of props.allLiveOrders) {
    //             packageStatus.add(object.status_orders);
    //         }

    //         setPackageStatusDropDownOptoin((prev) => {
    //             return ["all status", ...(Array.from(packageStatus) as string[])];
    //         });
    //     }
    // }, [props.allLiveOrders]);

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative z-10 "}>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} filterByDate={props.filterByDate} />
                <ReactPaginateComponent
                    pageCount={props.pageCount}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                 <FilterOptionDropDown
                  options={packageStatusDropDownOptoin}
                   type="packageStatus" 
                 onChange={props.onChangeStatus!} 
                 />
            
                {/* {props.allLiveOrders> 0 && (
                    <div className="flex-type1 space-x-[10px] "> */}
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        {/* 
                        <MazStatsDropddown options={perPageOptions} type="per_page" onChange={props.itemPerPageHandler!} className="h-[38px] px-[10px]" /> */}
                       
                        {/* <FilterOptionDropDown options={warehousesDropDownOptoin} type="warehouse" /> */}

                        {/* <AdminOptionDropDown disabled={!props.selectedOrder?.length} orders={props.allLiveOrders} /> */}
                    {/* </div>
                )} */}
            </div>
        </>
    );
};

export default React.memo(LiveOrderPageHeader);

// { backgroundColor: "#BBC2CF", color: "#FFFFFF" }
