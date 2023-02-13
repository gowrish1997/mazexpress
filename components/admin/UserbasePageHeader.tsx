import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import { IUser } from "@/models/user.interface";
import SendNotificatonConfirmModal from "./modal/SendNotificatonConfirmModal";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
interface IProp {
    content: string;
    title?: string;
    selectedUser?: number[];
    allUsers: IUser[];
    filterByDate: (value: Date | string) => void;
}

const adminOption = ["Send notificatons"];

const UserbasePageHeader = (props: IProp) => {
    const [showSendNotificatoinConfirmModal, setShowSendNotificatoinConfirmModal] = useState(false);

    const toggleSendNotificatoinConfirmModal = () => {
        setShowSendNotificatoinConfirmModal((prev) => !prev);
    };

    const sendNotificatoinHanlder = () => {
        console.log();
    };

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "}>
                <Head>
                    <title></title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allUsers} filterByDate={props.filterByDate} />
                {props.allUsers && props.allUsers.length > 0 && (
                    <div className="flex-type1 space-x-[10px]  ">
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        {/* <FilterOptionDropDown options={warehousesDropDownOptoin} /> */}
                        <AdminOptionDropDown orders={props.allUsers} option={adminOption} toggle={toggleSendNotificatoinConfirmModal} disabled={!props.selectedUser?.length} />
                    </div>
                )}
            </div>
            <SendNotificatonConfirmModal
                close={toggleSendNotificatoinConfirmModal}
                show={showSendNotificatoinConfirmModal}
                total={props.selectedUser?.length!}
                confirm={sendNotificatoinHanlder}
            />
        </>
    );
};

export default UserbasePageHeader;
