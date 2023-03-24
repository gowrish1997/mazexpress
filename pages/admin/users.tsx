import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import BlankPage from "@/components/admin/BlankPage";
import useUsers from "@/lib/hooks/useUsers";
import useUsersCount from "@/lib/hooks/useUserCount";
import { User } from "@/models/user.model";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
// import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getDateInDBFormat } from "@/lib/utils";

import user from "../api/user";

interface ISearchKeyContext {
    searchKey: any;
}
const tableHeaders = [
    "Customer",
    "Email ID",
    "Mobile Number",
    "Created Date",
    "Age",
    "Gender",
    "Total Orders",
];

const UserBase = () => {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;

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
    const { users, mutateUsers, usersIsLoading, usersError } = useUsers({
        search: searchKey,
        per_page: itemsPerPage,
        page: currentPage,
        include_users: true,
        date: getDateInDBFormat(createdDateFilterKey as Date),
    });

    console.log(users);
    // const { userCount, mutateUserCount, userCountIsLoading, userCountError } =
    //     useUsersCount({
    //         search: searchKey,
    //         per_page: itemsPerPage,
    //         page: currentPage,
    //         include_users: true,
    //         date: getDateInDBFormat(createdDateFilterKey as Date),
    //     });
    // console.log(allUser);

    //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);
  

    const filterByCreatedDate = (value: Date | string) => {
        setCreatedDateFilterKey(value);
    };
    const currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0);
        setItemPerPage(value as number);
    }, []);

    // const selectOrderHandler = (value: string, type: string) => {
    //     selectOrder(value, type, setSelectedUser, filteredUsers!, selectedUser!);
    // };

    if (usersIsLoading) {
        return <div>this is loading</div>;
    }
    if (usersError) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <UserbasePageHeader
                    content="User Base"
                    allUsers={users?.data as User[]}
                    filterByDate={filterByCreatedDate}
                    title="User Base | MazExpress Admin"
                    pageCount={Math.ceil(
                        (users?.count as number) / itemsPerPage
                    )}
                    currentPageHandler={currentPageHandler}
                    itemsPerPage={itemsPerPage}
                    itemPerPageHandler={itemPerPageHandler}
                    currentPage={currentPage}
                    createdDateFilterKey={createdDateFilterKey}
                    isFilterPresent={searchKey || createdDateFilterKey}
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!users?.data && !searchKey && !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <>
                            <Table
                                rows={users?.data as User[]}
                                headings={tableHeaders}
                                type="user_base"
                            />
                        </>
                    )}
                </div>
                {/* {selectedUser?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedUser?.length} orders are selected`}</div>
                )} */}
            </div>
        </>
    );
};

export default UserBase;
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
