import React, { useState,useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IOrderResponse } from "@/models/order.interface";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
import ReactPaginateComponent from "./ReactPaginate";
import { perPageOptinsList } from "@/lib/helper";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";

interface IProp {
    content: string;
    title?: string;
    selectedOrder?: string[];
    allLiveOrders: OrderEntity[];
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    itemPerPageHandler?: (value: string | number) => void;
    // filterById:(value:string)=>void
}

const DeliveredPageHeader = (props: IProp) => {

    const perPageOptions = perPageOptinsList()
    const warehousesDropDownOptoin = ["istanbul"];

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
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
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <ReactDropdown   /> */}
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        <MazStatsDropddown options={perPageOptions} type="per_page" onChange={props.itemPerPageHandler!} className="h-[38px] px-[10px]" itemsPerPage={props.itemsPerPage} />
                        <FilterOptionDropDown options={warehousesDropDownOptoin} type="warehouse" />

                        <AdminOptionDropDown orders={props.allLiveOrders} />
                    </div>
                )}
            </div>
        </>
    );
};

export default DeliveredPageHeader;
