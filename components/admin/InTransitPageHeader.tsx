import React, { useState } from "react";
import Head from "next/head";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import { IOrderResponse } from "@/models/order.interface";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import MarkAsDeliveredConfirmModal from "./modal/MarkAsDeliveredConfirmModal";
import CommentModal from "./modal/AddCommentModal";
interface IProp {
    content: string;
    title?: string;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[];
    filterByDate: (value: Date | string) => void;
}

const adminOption = ["Add Comment", "Mark as Delivered"];

const InTransitPageHeader = (props: IProp) => {
    const warehousesDropDownOptoin = ["istanbul"];

    const [showMarkedAsConfirmModal, setShowMarkedAsConfirmModal] = useState(false);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);

    const toggleMarkedAsConfirmModal = () => {
        setShowMarkedAsConfirmModal((prev) => !prev);
    };
    const toggleAddCommentModal = () => {
        setShowAddCommentModal((prev) => !prev);
    };

    const markedAsDeliveredHandler = () => {
        console.log(props.selectedOrder);
    };

    const addCommentHandler = () => {
        console.log("add commnet");
    };
    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
                <Head>
                    <title></title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} filterByDate={props.filterByDate} />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        <FilterOptionDropDown options={warehousesDropDownOptoin} />

                        <AdminOptionDropDown option={adminOption} toggle={toggleMarkedAsConfirmModal} disabled={!props.selectedOrder?.length} orders={props.allLiveOrders} />
                    </div>
                )}
            </div>

            <MarkAsDeliveredConfirmModal
                close={toggleMarkedAsConfirmModal}
                show={showMarkedAsConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={markedAsDeliveredHandler}
            />
            <CommentModal close={toggleMarkedAsConfirmModal} show={showMarkedAsConfirmModal}  confirm={addCommentHandler} />
        </>
    );
};

export default InTransitPageHeader;
