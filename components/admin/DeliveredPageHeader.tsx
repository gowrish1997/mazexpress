import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ReactDropdown from "../common/ReactDropdown";
import { IOrderResponse } from "@/models/order.interface";
import download from "../../public/download.png";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
interface IProp {
    content: string;
    title?: string;
    onChangeWarehouse?: (value: string) => void;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[];
}

const DeliveredPageHeader = (props: IProp) => {
    const warehousesDropDownOptoin = ["istanbul"];

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
                <Head>
                    <title></title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        <ReactDropdown options={warehousesDropDownOptoin} onChange={props.onChangeWarehouse!} />

                        <AdminOptionDropDown orders={props.allLiveOrders} />
                    </div>
                )}
            </div>
        </>
    );
};

export default DeliveredPageHeader;
