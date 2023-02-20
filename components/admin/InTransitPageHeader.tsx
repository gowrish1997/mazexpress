import React, { useState } from "react";
import Head from "next/head";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import { IOrderResponse } from "@/models/order.interface";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import MarkAsDeliveredConfirmModal from "./modal/MarkAsDeliveredConfirmModal";
import CommentModal from "./modal/AddCommentModal";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
import ReactPaginateComponent from "./ReactPaginate";
interface IProp {
    content: string;
    title?: string;
    selectedOrder?: string[];
    allLiveOrders: IOrderResponse[];
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    // filterById:(value:string)=>void
}

const adminOption = ["Received in Libya", "Out for delivery", "Mark as delivered"];

const InTransitPageHeader = (props: IProp) => {
    const warehousesDropDownOptoin = ["istanbul"];

    const [showMarkedAsConfirmModal, setShowMarkedAsConfirmModal] = useState(false);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);
    const [inTrasitCurrentStatus, setIntransitCurrentStatus] = useState("");

    const toggleIntransitChangeStatusConfirmModal = (value?: string) => {
        if (value == "Add comment") {
            setShowAddCommentModal(true);
        } else {
            setIntransitCurrentStatus(value!);
            setShowMarkedAsConfirmModal((prev) => !prev);
        }
    };

    const inTransitChangeStatusHandler = () => {
        switch (inTrasitCurrentStatus) {
            case "Received in Libya":
                console.log("Received in Libya");
                break;
            case "Out for delivery":
                console.log("out for Delivery");
                break;
            case "Mark as delivered":
                console.log("mark as delivered");
        }
    };

    const addCommentHandler = (comment: string) => {
        console.log(props.selectedOrder, comment);
    };

    const closeAddCommentModal = () => {
        setShowAddCommentModal(false);
    };

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
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        <FilterOptionDropDown options={warehousesDropDownOptoin} type="warehouse" />

                        <AdminOptionDropDown
                            option={adminOption}
                            toggle={toggleIntransitChangeStatusConfirmModal}
                            disabled={!props.selectedOrder?.length}
                            orders={props.selectedOrder}
                            type={props.content}
                        />
                    </div>
                )}
            </div>

            <MarkAsDeliveredConfirmModal
                close={toggleIntransitChangeStatusConfirmModal}
                show={showMarkedAsConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={inTransitChangeStatusHandler}
            />
            <CommentModal close={closeAddCommentModal} show={showAddCommentModal} total={props.selectedOrder!} confirm={addCommentHandler} />
        </>
    );
};

export default InTransitPageHeader;
