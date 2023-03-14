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
          pageCount={props.pageCount}
          currentPageHandler={props.currentPageHandler}
          itemsPerPage={props.itemsPerPage}
          currentPage={props.currentPage}
        />
        {props.allLiveOrders && props.allLiveOrders.length > 0 && (
          <div className="flex-type1 space-x-[10px]  ">
            {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
            {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}
            
            <MazStatsDropddown
              options={perPageOptinsList}
              type="per_page"
              onChange={props.itemPerPageHandler!}
              className="h-[38px] px-[10px]"
              itemsPerPage={props.itemsPerPage}
            />
            <FilterOptionDropDown
              options={warehousesDropDownOptoin}
              type="warehouse"
            />

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
      <CommentModal
        close={closeAddCommentModal}
        show={showAddCommentModal}
        total={props.selectedOrder!}
        confirm={addCommentHandler}
      />
    </>
  );
};

export default InTransitPageHeader;
