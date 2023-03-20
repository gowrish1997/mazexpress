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
import fetchJson from "@/lib/fetchServer";
const adminOption = ["Move to Shipments"];

const PendingPageHeader = (props: IPageHeaderProp) => {
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        count: true,
        status: ["pending"],
    });

    const warehousesDropDownOptoin = ["istanbul"];
    const [showMoveToShipmentConfirmModal, setShowMoveToShipmentConfirmModal] =
        useState(false);

    const toggleMoveToShipmentHandler = () => {
        setShowMoveToShipmentConfirmModal((prev) => !prev);
    };

    const moveToShipmentsHandler = async () => {
        const result0_2 = await fetchJson(`/api/orders/bulk`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                ids: props.selectedOrder,
                status: "",
            }),
        });

        console.log(result0_2);

        // console.log(props.selectedOrder);
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
                />
                <ReactPaginateComponent
                    pageCount={Math.ceil(
                        (orders as number) / props.itemsPerPage
                    )}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
                        {/* <MazStatsDropddown
              options={perPageOptions}
              type="per_page"
              onChange={props.itemPerPageHandler!}
              className="h-[38px] px-[10px]"
              itemsPerPage={props.itemsPerPage}
            /> */}
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
