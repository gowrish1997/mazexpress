import React, { useState } from "react";
import Head from "next/head";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import { IOrderResponse } from "@/models/order.interface";
import ScheduleShipmentModal from "./modal/ScheduleShipmentModal";
import MovedOutConfirmModal from "./modal/MovedOutConfirmModal";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import SearchMazTrackingIdInputField from "./SearchMazTrackingIdInputField";
interface IProp {
  content: string;
  title?: string;
  selectedOrder?: string[];
  allLiveOrders: IOrderResponse[];
  filterByDate: (value: Date | string) => void;
  // filterById:(value:string)=>void
}

const adminOption = ["Moved out"];

const ShipmentsPageHeader = (props: IProp) => {
  const warehousesDropDownOptoin = ["istanbul"];

  // const [showSheduleShipmentModal, setShowSheduleShipmentModal] = useState(false);
  const [showMovedOutConfirmModal, setMovedOutConfirmModal] = useState(false);

  // const [shipmentSelectedDate, setShipmentSelectedDate] = useState<Date | null>(null);

  // const toggleScheduleShipmentModal = () => {
  //     setShowSheduleShipmentModal((prev) => !prev);
  // };

  const toggleMovedOutConfirmModal = () => {
    setMovedOutConfirmModal((prev) => !prev);
  };

  // const scheduleSelectedShipmentsHandler = () => {
  //     console.log(props.selectedOrder, shipmentSelectedDate);
  // };

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
        {props.allLiveOrders && props.allLiveOrders.length > 0 && (
          <div className="flex-type1 space-x-[10px]  ">
             {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
            {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
            <FilterOptionDropDown options={warehousesDropDownOptoin} type='warehouse' />
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
