import React, { useState } from "react";
import Head from "next/head";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import MarkAsDeliveredConfirmModal from "./modal/MarkAsDeliveredConfirmModal";
import CommentModal from "./modal/AddCommentModal";
import ReactPaginateComponent from "./ReactPaginate";
import { IPageHeaderProp } from "@/models/pageHeader.interface";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import { perPageOptinsList } from "@/lib/helper";
import useOrders from "@/lib/hooks/useOrders";
import { Order } from "@/models/order.model";
import { bulkActionHandler } from "@/lib/selectOrder";
import { createToast } from "@/lib/toasts";
import { getOrderIdList } from "@/lib/selectOrder";

const adminOption = [
    "Received in Libya",
    "Out for delivery",
    "Mark as delivered",
];

const InTransitPageHeader = (props: IPageHeaderProp) => {
    const warehousesDropDownOptoin = ["istanbul"];

    const [showMarkedAsConfirmModal, setShowMarkedAsConfirmModal] =
        useState(false);
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

    const inTransitChangeStatusHandler = async () => {
        switch (inTrasitCurrentStatus) {
            case "Received in Libya":
                console.log("Received in Libya");
                try {
                    const status1 = await bulkActionHandler(
                        props.selectedOrder as Order[],
                        "in-transit",
                        3,
                        "Order received at Libya warehouse!",
                        "received at Libya warehouse!",
                        false
                    );
                    console.log(status1);

                    createToast({
                        type: "success",
                        title: "Notified User",
                        message: `status changed successfully for orders with ID ${getOrderIdList(
                            props.selectedOrder
                        )}`,
                        timeOut: 2000,
                    });

                    props.mutateOrder?.();
                    props.setSelectedOrder?.([]);
                } catch (error) {
                    console.error(error);
                }

                break;
            case "Out for delivery":
                console.log("out for Delivery");
                try {
                    const status2 = await bulkActionHandler(
                        props.selectedOrder as Order[],
                        "out-for-delivery",
                        4,
                        " Order out for delivery",
                        "has been out for delivery",
                        true
                    );

                    createToast({
                        type: "success",
                        title: "Notified User",
                        message: `status changed successfully for orders with ID ${getOrderIdList(
                            props.selectedOrder
                        )}`,
                        timeOut: 2000,
                    });

                    props.mutateOrder?.();
                    props.setSelectedOrder?.([]);
                } catch (error) {
                    console.error(error);
                }

                break;
            case "Mark as delivered":
                console.log("mark as delivered");

                try {
                    const status3 = await bulkActionHandler(
                        props.selectedOrder as Order[],
                        "delivered",
                        5,
                        "order delivered",
                        "has delivered ",
                        true
                    );

                    createToast({
                        type: "success",
                        title: "Notified User",
                        message: `status changed successfully for orders with ID ${getOrderIdList(
                            props.selectedOrder
                        )}`,
                        timeOut: 2000,
                    });

                    props.mutateOrder?.();
                    props.setSelectedOrder?.([]);
                } catch (error) {
                    console.error(error);
                }
        }
    };

    // const addCommentHandler = (comment: string) => {
    //     console.log(props.selectedOrder, comment);
    // };

    // const closeAddCommentModal = () => {
    //     setShowAddCommentModal(false);
    // };

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
                    createdDateFilterKey={props.createdDateFilterKey}
                />
                <ReactPaginateComponent
                    pageCount={props.pageCount!}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {((props.allLiveOrders && props.allLiveOrders.length > 0) ||
                    props.isFilterPresent) && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}

                        <MazStatsDropddown
                            options={perPageOptinsList()}
                            header="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            itemPerPage={props.itemsPerPage}
                            selection={[]}
                        />
                        <FilterOptionDropDown
                            options={warehousesDropDownOptoin}
                            type="warehouse"
                        />

                        <AdminOptionDropDown
                            option={adminOption}
                            toggle={toggleIntransitChangeStatusConfirmModal}
                            disabled={!props.selectedOrder?.length}
                            selectedOrders={props.selectedOrder as Order[]}
                            orders={props.allLiveOrders as Order[]}
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
            {/* <CommentModal
                close={closeAddCommentModal}
                show={showAddCommentModal}
                total={props.selectedOrder!}
                confirm={addCommentHandler}
            /> */}
        </>
    );
};

export default InTransitPageHeader;
