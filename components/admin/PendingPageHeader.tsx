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
import { getUserIdList } from "@/lib/selectOrder";

const adminOption = ["Move to Shipments"];

const PendingPageHeader = (props: IPageHeaderProp) => {
    console.log(typeof fetchServer);

    console.log(props);
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
        let sendNotification = true;

        for (let i = 0; i < props.selectedOrder?.length!; i++) {
            let rowFixed: Order = props.selectedOrder?.[i] as Order;

            try {
                const result0 = await fetchServer(
                    `/api/orders?id=${rowFixed.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ status: "at-warehouse" }),
                    }
                );
            } catch (error) {
                console.log(error);
            }

            const result0_2 = await fetchServer(`/api/tracking`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    order_id: rowFixed.id,
                    user_id: rowFixed.user?.id,
                    stage: 1,
                }),
            });

            if (rowFixed.user?.is_notifications_enabled) {
                // get admin notification on backend
                // send notification post
                const deliveredMessage = {
                    title: "Order arrived at Istanbul warehouse!",
                    content: `Your order number ${rowFixed.id} has been received at our Istanbul warehouse and will be shipped soon.`,
                };
                const result0_3: APIResponse<Notification> = await fetchServer(
                    "/api/notifications",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: deliveredMessage,
                            // files: [],
                            users: [rowFixed.user.id],
                            // notification_config: 1,
                        }),
                    }
                );

                if (result0_3?.count && result0_3?.count > 0) {
                    sendNotification = true;
                } else {
                }
            }
        }

        if (sendNotification) {
            createToast({
                type: "success",
                title: "Notified User",
                message: `Sent order received notification to userID ${getUserIdList(
                    props.selectedOrder
                )}`,
                timeOut: 2000,
            });
        } else {
            createToast({
                type: "error",
                title: "Failed creating notification",
                message: `check console for more info`,
                timeOut: 2000,
            });
        }

        props.mutateOrder?.();
        props.setSelectedOrder?.([]);
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
                    pageCount={props.pageCount!}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
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
