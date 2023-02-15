import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ReactDropdown from "../common/ReactDropdown";
import { IOrderResponse } from "@/models/order.interface";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
interface IProp {
  content: string;
  title?: string;
  selectedOrder?: string[];
  allLiveOrders: IOrderResponse[];
  filterByDate: (value: Date | string) => void;
  filterById:(value:string)=>void
}

const DeliveredPageHeader = (props: IProp) => {
  const warehousesDropDownOptoin = ["istanbul"];

  return (
    <>
      <div
        className={
          "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "
        }
      >
        <Head>
          <title>{props.title}</title>
        </Head>
        <PageheaderTitle
          content={props.content}
          allLiveOrders={props.allLiveOrders}
          filterByDate={props.filterByDate}
        />
        {props.allLiveOrders && props.allLiveOrders.length > 0 && (
          <div className="flex-type1 space-x-[10px]  ">
            {/* <ReactDropdown   /> */}
            <SearchMazTrackingIdInputField filterById={props.filterById} />
            <FilterOptionDropDown options={warehousesDropDownOptoin} />

            <AdminOptionDropDown orders={props.allLiveOrders} />
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveredPageHeader;
