import React, { useState } from "react";
import Head from "next/head";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import { IOrderResponse } from "@/models/order.interface";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import MoveToShipmentConfirmModal from "./modal/MoveToShipmentConfirmModal";
interface IProp {
    content: string;
    title?: string;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[] | undefined;
    filterByDate: (value: Date | string) => void;
    //  filterById: (value: string) => void;
}

const adminOption = ["Move to Shipments"];

const PendingPageHeader = (props: IProp) => {
    const warehousesDropDownOptoin = ["istanbul"];
    const [showMoveToShipmentConfirmModal, setShowMoveToShipmentConfirmModal] = useState(false);

    const toggleMoveToShipmentHandler = () => {
        setShowMoveToShipmentConfirmModal((prev) => !prev);
    };

    const moveToShipmentsHandler = () => {
        console.log(props.selectedOrder);
    };

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} filterByDate={props.filterByDate} />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        <FilterOptionDropDown options={warehousesDropDownOptoin} type='warehouse' />

                        <AdminOptionDropDown option={adminOption} toggle={toggleMoveToShipmentHandler} disabled={!props.selectedOrder?.length} orders={props.allLiveOrders} />
                    </div>
                )}
            </div>

            <MoveToShipmentConfirmModal
                close={toggleMoveToShipmentHandler}
                show={showMoveToShipmentConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={moveToShipmentsHandler}
            />
        </>
    );
};

export default PendingPageHeader;
