import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
// import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import AddButton from "@/components/common/AddButton";
import AddNewAdminModal from "@/components/admin/modal/AddNewAdminModal";
import useUsers from "@/lib/hooks/useUsers";

import { User } from "@/models/user.model";

import { getDateInDBFormat } from "@/lib/utils";

const tableHeaders = [
    "User",
    "Email ID",
    "Mobile Number",
    "Created Date",
    "Age",
    "Gender",
];
interface ISearchKeyContext {
    searchKey: any;
}
const AdminBase = () => {
    const router = useRouter();

    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    // useEffect(() => {
    //     console.log("use efft");
    //     router.push(router.asPath, router.asPath, { locale: "en" });
    // }, []);

    const { searchKey } = React.useContext(
        SearchKeyContext
    ) as ISearchKeyContext;
    const [itemsPerPage, setItemPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        Date | string
    >("");

    const { users, mutateUsers } = useUsers({
        search: searchKey,
        page: currentPage,
        per_page: itemsPerPage,
        include_admins: true,
        date: getDateInDBFormat(createdDateFilterKey as Date),
    });

    const [showAddNewAdminModal, setShowAddNewAdminModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User[]>();

    //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);

    const currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0);
        setItemPerPage(value as number);
    }, []);

    const filterByCreatedDate = (value: Date | string) => {
        setCreatedDateFilterKey(value);
    };

    const ToggleAddNewAdminModalHandler = () => {
        if (showAddNewAdminModal) {
            mutateUsers();
        }
        setShowAddNewAdminModal((prev) => !prev);
    };

    const selectUserHandler = (value: string, type: string) => {
        console.log(value);
        selectOrder(
            value,
            type,
            setSelectedUser,
            users?.data as User[],
            selectedUser as User[]
        );
    };

    //   if (error) {
    //     return <div>some error happened</div>;
    //   }
    return (
        <>
            <div>
                <UserbasePageHeader
                    content="Admin Base"
                    selectedUser={selectedUser}
                    allUsers={users?.data as User[]}
                    filterByDate={filterByCreatedDate}
                    title="Admin Base | MazExpress Admin"
                    pageCount={Math.ceil(
                        (users?.count as number) / itemsPerPage
                    )}
                    currentPageHandler={currentPageHandler}
                    itemPerPageHandler={itemPerPageHandler!}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    createdDateFilterKey={createdDateFilterKey}
                    isFilterPresent={searchKey || createdDateFilterKey}
                    mutateUser={mutateUsers}
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!users?.data && !searchKey && !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <>
                            <Table
                                rows={users?.data as User[]}
                                headings={tableHeaders}
                                type="admin_base"
                                onSelect={selectUserHandler}
                                selectedOrder={selectedUser!}
                                mutateUser={mutateUsers}
                            />
                            <AddButton
                                onClick={ToggleAddNewAdminModalHandler}
                            />
                        </>
                    )}
                </div>
                {selectedUser?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedUser?.length} orders are selected`}</div>
                )}
            </div>
            {showAddNewAdminModal && (
                <AddNewAdminModal close={ToggleAddNewAdminModalHandler} />
            )}
        </>
    );
};

export default AdminBase;
export async function getStaticProps({ locale }: { locale: any }) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
