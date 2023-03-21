import React, { useState, useMemo } from "react";
import Head from "next/head";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import MovedOutConfirmModal from "./modal/MovedOutConfirmModal";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import ReactPaginateComponent from "./ReactPaginate";
import { IPageHeaderProp } from "@/models/pageHeader.interface";
import useOrders from "@/lib/hooks/useOrders";
import { Order } from "@/models/order.model";
import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import { perPageOptinsList } from "@/lib/helper";
import { getUserIdList } from "@/lib/selectOrder";

const adminOption = ["Moved out"];

const ShipmentsPageHeader = (props: IPageHeaderProp) => {
    const perPageOptions = perPageOptinsList();
    const router = useRouter();
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        count: true,
        status: ["at-warehouse"],
    });
    const warehousesDropDownOptoin = ["istanbul"];
    const [showMovedOutConfirmModal, setMovedOutConfirmModal] = useState(false);

    const toggleMovedOutConfirmModal = () => {
        setMovedOutConfirmModal((prev) => !prev);
    };

    const MovedOutHanlder = async () => {
        let sendNotification = true;

        for (let i = 0; i < props.selectedOrder?.length!; i++) {
            let rowFixed2: Order = props.selectedOrder?.[i] as Order;

            // put to order
            const result1 = await fetchJson(`/api/orders?id=${rowFixed2.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ status: "in-transit" }),
            });
            // console.log(result1);
            const result1_2 = await fetchJson("/api/tracking", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id: rowFixed2?.user.id,
                    order_id: rowFixed2.id,
                    stage: 2,
                }),
            });
            // console.log(result1_2);
            // check notifications for user and send notification
            // get notification for user
            if (rowFixed2.user.is_notifications_enabled) {
                // get admin notification on backend
                // send notification post
                const deliveredMessage = {
                    title: "Order left Istanbul warehouse!",
                    content: `Your order number ${rowFixed2.id} has left our Istanbul warehouse and will be reach Libya soon.`,
                };

                const result0_3: APIResponse<Notification> = await fetchJson(
                    "/api/notifications",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: deliveredMessage,
                            // files: [],
                            users: [rowFixed2.user.id],
                            // notification_config: 1,
                        }),
                    }
                );
                // console.log(result0_3);

                if (result0_3?.count && result0_3?.count > 0) {
                    sendNotification = true;
                } else {
                    sendNotification = false;
                }
            }
        }

        if (sendNotification) {
            createToast({
                type: "success",
                title: "Notified User",
                message: `Sent order left Istanbul warehouse notification to userID ${getUserIdList(
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
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
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
                        {/* <button
                            className="box-border border-[1px] border-[#BBC2CF] h-[38.6px] px-[10px] rounded-[4px] mt-[5px] text-[14px] font-[700] text-[#525D72] leading-[19px] tracking-wider hover:bg-[#BBC2CF] hover:text-[#FFFFFF] disabled:opacity-50"
                            disabled={!props.selectedOrder?.length}
                            onClick={toggleScheduleShipmentModal}
                            style={showSheduleShipmentModal ? { backgroundColor: "#35C6F4", color: "#FFFFFF" } : {}}
                        >
                            Schedule Deliver
                        </button> */}
                        {/* <button className="box-border border-[1px] border-[#BBC2CF] h-[37.5px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] disabled:opacity-50 flex flex-row justify-start items-center space-x-[5px] mt-[4px] ">
                            <Image src={download} height={13} width={13} alt="download" />
                            <span>download</span>
                        </button>
                        <button
                            className="box-border border-[1px] border-[#BBC2CF] h-[38.6px] px-[10px] rounded-[4px] mt-[5px] text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] tracking-wider hover:text-[#FFFFFF] disabled:opacity-50 "
                            onClick={toggleMarkAsDeliveredConfirmModal}
                            disabled={!props.selectedOrder?.length}
                        >
                            Mark as Delivered
                        </button> */}
                        <AdminOptionDropDown
                            option={adminOption}
                            toggle={toggleMovedOutConfirmModal}
                            disabled={!props.selectedOrder?.length}
                            orders={props.allLiveOrders}
                        />
                    </div>
                )}
            </div>
            {/* <ScheduleShipmentModal
                close={toggleScheduleShipmentModal}
                show={showSheduleShipmentModal}
                setShipmentSelectedDate={setShipmentSelectedDate}
                confirm={scheduleSelectedShipmentsHandler}
            /> */}
            <MovedOutConfirmModal
                close={toggleMovedOutConfirmModal}
                show={showMovedOutConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={MovedOutHanlder}
            />
        </>
    );
};

export default ShipmentsPageHeader;
