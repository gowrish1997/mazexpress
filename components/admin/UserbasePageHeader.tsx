import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import SearchUserInputField from "./SearchUserInputField";
import SendNotificatonConfirmModal from "./modal/SendNotificatonConfirmModal";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import ReactPaginateComponent from "./ReactPaginate";
import { perPageOptinsList } from "@/lib/helper";
import { User } from "@/models/user.model";
interface IProp {
    content: string;
    title?: string;
    selectedUser?: number[];
    allUsers: User[];
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    itemPerPageHandler?: (value: string | number) => void;
    // filterByUser:(value:string)=>void
}

const UserbasePageHeader = (props: IProp) => {
    const perPageOptions = perPageOptinsList();
    const [showSendNotificatoinConfirmModal, setShowSendNotificatoinConfirmModal] = useState(false);


    const toggleSendNotificatoinConfirmModal = () => {
        setShowSendNotificatoinConfirmModal((prev) => !prev);
    };

<<<<<<< HEAD
    const sendNotificatoinHanlder = () => {
        console.log();
    };

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allUsers} filterByDate={props.filterByDate} />
                <ReactPaginateComponent
                    pageCount={props.pageCount}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {props.allUsers && props.allUsers.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        <MazStatsDropddown
                            options={perPageOptions}
                            type="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            itemsPerPage={props.itemsPerPage}
                        />
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        {/* <FilterOptionDropDown options={warehousesDropDownOptoin} /> */}
                        {/* <SearchUserInputField filterByUser={props.filterByUser}/> */}
                        <AdminOptionDropDown orders={props.allUsers} toggle={toggleSendNotificatoinConfirmModal} disabled={!props.selectedUser?.length} />
                    </div>
                )}
            </div>
            <SendNotificatonConfirmModal
                close={toggleSendNotificatoinConfirmModal}
                show={showSendNotificatoinConfirmModal}
                total={props.selectedUser?.length!}
                confirm={sendNotificatoinHanlder}
=======
const UserbasePageHeader = (props: IProp) => {
  const [
    showSendNotificatoinConfirmModal,
    setShowSendNotificatoinConfirmModal,
  ] = useState(false);

  const toggleSendNotificatoinConfirmModal = () => {
    setShowSendNotificatoinConfirmModal((prev) => !prev);
  };

  const sendNotificatoinHanlder = () => {
    console.log();
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
          allLiveOrders={props.allUsers}
          filterByDate={props.filterByDate}
        />
        <ReactPaginateComponent
          pageCount={props.pageCount}
          currentPageHandler={props.currentPageHandler}
          itemsPerPage={props.itemsPerPage}
          currentPage={props.currentPage}
        />
        {props.allUsers && props.allUsers.length > 0 && (
          <div className="flex-type1 space-x-[10px]  ">
            <AdminOptionDropDown
              orders={props.allUsers}
              toggle={toggleSendNotificatoinConfirmModal}
              disabled={!props.selectedUser?.length}
>>>>>>> sessions
            />
        </>
    );
};

export default UserbasePageHeader;
