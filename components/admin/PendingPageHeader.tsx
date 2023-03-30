import React, { useState } from "react";
import Head from "next/head";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import MoveToShipmentConfirmModal from "./modal/MoveToShipmentConfirmModal";
import ReactPaginateComponent from "./ReactPaginate";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import { IPageHeaderProp } from "@/models/pageHeader.interface";
import useOrders from "@/lib/hooks/useOrders";
import axios from "axios";
import fetchServer from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { perPageOptinsList } from "@/lib/helper";
import { getOrderIdList } from "@/lib/selectOrder";
import { bulkActionHandler } from "@/lib/selectOrder";

const adminOption = ["Move to Shipments"];

const PendingPageHeader = (props: IPageHeaderProp) => {
    const perPageOptions = perPageOptinsList();
    const router = useRouter();
    const { user, mutateUser } = useUser();

    const warehousesDropDownOptoin = ["istanbul"];
    const [showMoveToShipmentConfirmModal, setShowMoveToShipmentConfirmModal] =
        useState(false);

    const toggleMoveToShipmentHandler = () => {
        setShowMoveToShipmentConfirmModal((prev) => !prev);
    };

    const moveToShipmentsHandler = async () => {
        try {
            const status = await bulkActionHandler(
                props.selectedOrder as Order[],
                "at-warehouse",
                1,
                "Order arrived at Istanbul warehouse!",
                "has been received at our Istanbul warehouse and will be shipped soon.",
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
    };

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
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        <MazStatsDropddown
                            options={perPageOptions}
                            header="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            itemPerPage={props.itemsPerPage}
                        />
                        <FilterOptionDropDown
                            options={warehousesDropDownOptoin}
                            type="warehouse"
                        />

                        <AdminOptionDropDown
                            option={adminOption}
                            toggle={toggleMoveToShipmentHandler}
                            disabled={!props.selectedOrder?.length}
                            orders={props.allLiveOrders}
                        />
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
