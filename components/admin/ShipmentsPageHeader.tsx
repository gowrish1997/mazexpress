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
const adminOption = ["Moved out"];

const ShipmentsPageHeader = (props: IPageHeaderProp) => {
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        count: true,
        status: ["at-warehouse"],
    });
    const warehousesDropDownOptoin = ["istanbul"];
    const [showMovedOutConfirmModal, setMovedOutConfirmModal] = useState(false);

    const toggleMovedOutConfirmModal = () => {
        setMovedOutConfirmModal((prev) => !prev);
    };

    const MovedOutHanlder = () => {
        console.log(props.selectedOrder);
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
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
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
                        {/* <button
                            className="box-border border-[1px] border-[#BBC2CF] h-[38.6px] px-[10px] rounded-[4px] mt-[5px] text-[14px] font-[700] text-[#525D72] leading-[19px] tracking-wider hover:bg-[#BBC2CF] hover:text-[#FFFFFF] disabled:opacity-50"
                            disabled={!props.selectedOrder?.length}
                            onClick={toggleScheduleShipmentModal}
                            style={showSheduleShipmentModal ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
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
