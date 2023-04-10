import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import RemoveAdminConfirmModal from "./modal/RemoveAdminConfirmModal";
import PageheaderTitle from "./PageheaderTitle";
import AdminOptionDropDown from "./AdminOptionDropDown";
import ReactPaginateComponent from "./ReactPaginate";
import { perPageOptinsList } from "@/lib/helper";
import { User } from "@/models/user.model";
import { createToast } from "@/lib/toasts";
import fetchJson from "@/lib/fetchServer";
import { getUserEmail } from "@/lib/selectOrder";
import { KeyedMutator } from "swr";
import { APIResponse } from "@/models/api.model";
interface IProp {
    content: string;
    title?: string;
    selectedUser?: any;
    allUsers: User[];
    filterByDate: (value: Date | string) => void;
    pageCount: number;
    currentPageHandler: (value: number) => void;
    itemsPerPage: number;
    currentPage: number;
    itemPerPageHandler?: (value: string | number) => void;
    isFilterPresent?: boolean;
    createdDateFilterKey?: string | Date;
    // filterByUser:(value:string)=>void
    mutateUser?: KeyedMutator<APIResponse<User>>;
}

const UserbasePageHeader = (props: IProp) => {
    const perPageOptions = perPageOptinsList();
    const [
        showSendNotificatoinConfirmModal,
        setShowSendNotificatoinConfirmModal,
    ] = useState(false);
    const [showRemoveAdminConfirmModal, setShowRemoveConfirmModal] =
        useState(false);

    const toggleRemoveAdminConfirmModal = () => {
        setShowRemoveConfirmModal((prev) => !prev);
    };

    const removeAdmins = async () => {
        let sendSuccessNotification = true;
        for (let i = 0; i < props.selectedUser?.length; i++) {
            try {
                const updateRes = await fetchJson(
                    `/api/users/${(props.selectedUser[i] as User).email}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch (error) {
                sendSuccessNotification = false;
                console.error(error);
            }
        }
        if (sendSuccessNotification) {
            props.mutateUser?.();
            createToast({
                type: "success",
                title: "success",
                message: `Admins with email ${getUserEmail(
                    props.selectedUser
                )} removed successfully`,
                timeOut: 2000,
            });
        } else {
            createToast({
                type: "error",
                title: "Some error happened",
                message: `check console for more info`,
                timeOut: 2000,
            });
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
                    allLiveOrders={props.allUsers}
                    filterByDate={props.filterByDate}
                    createdDateFilterKey={props.createdDateFilterKey}
                />
                <ReactPaginateComponent
                    pageCount={props.pageCount}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {((props.allUsers && props.allUsers.length > 0) ||
                    props.isFilterPresent) && (
                    <div className="flex-type1 space-x-[10px]  ">
                        <MazStatsDropddown
                            options={perPageOptions}
                            header="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            selection={[]}
                            itemPerPage={props.itemsPerPage}
                        />
                        {/* <ReactDropdown options={warehousesDropDownOptoin} /> */}
                        {/* <FilterOptionDropDown options={warehousesDropDownOptoin} /> */}
                        {/* <SearchUserInputField filterByUser={props.filterByUser}/> */}
                        <AdminOptionDropDown
                            option={
                                props.content == "Admin Base"
                                    ? ["Remove admin"]
                                    : []
                            }
                            toggle={toggleRemoveAdminConfirmModal}
                            disabled={!props.selectedUser?.length}
                            users={props.allUsers}
                        />
                    </div>
                )}
            </div>
            {showRemoveAdminConfirmModal && (
                <RemoveAdminConfirmModal
                    close={toggleRemoveAdminConfirmModal}
                    total={props.selectedUser?.length!}
                    confirm={removeAdmins}
                />
            )}
            {/* <SendNotificatonConfirmModal
                close={toggleSendNotificatoinConfirmModal}
                show={showSendNotificatoinConfirmModal}
                total={props.selectedUser?.length!}
                confirm={sendNotificatoinHanlder}
            /> */}
        </>
    );
};

export default UserbasePageHeader;
