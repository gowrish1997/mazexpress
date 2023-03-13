<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState, useCallback } from "react";
import useOrders from "@/lib/useOrders";
import moment from "moment";
>>>>>>> translate
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import BlankPage from "@/components/admin/BlankPage";
<<<<<<< HEAD
import useAllUser from "@/lib/hooks/useAllUsers";
import useUsers from "@/lib/hooks/useUsers";
import { User } from "@/models/user.model";
=======
import useAllUser from "@/lib/useAllUsers";
import { IUser } from "@/models/user.interface";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
import orders from "../api/orders";
import user from "../api/auth/user";
import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
>>>>>>> translate

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
<<<<<<< HEAD
  const router = useRouter();

  const [itemsPerPage, setItemPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    Date | string
  >("");
  const { users, mutateUsers, usersIsLoading, usersError } = useUsers({
    per_page: itemsPerPage,
    page: currentPage,
    is_admin: false,
  });
  // console.log(allUser);
=======
    const router = useRouter();
    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        console.log("use efft");
        router.push(router.asPath, router.asPath, { locale: "en" });
    }, []);

    const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;
    const [itemsPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");
    const { allUser, mutateAllUser, allUserIsLoading, error } = useAllUser({
        per_page: itemsPerPage,
        page: currentPage,
    });
    console.log(allUser);
>>>>>>> translate

  //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil((users as User[] || []).length / itemsPerPage);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

<<<<<<< HEAD
  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
  };
=======
    const currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0);
        setItemPerPage(value as number);
    }, []);
>>>>>>> translate

  // const selectOrderHandler = (value: string, type: string) => {
  //     selectOrder(value, type, setSelectedUser, filteredUsers!, selectedUser!);
  // };

<<<<<<< HEAD
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
          allUsers={users as User[]}
          filterByDate={filterByCreatedDate}
          title="User Base | MazExpress Admin"
          pageCount={pageCount}
          currentPageHandler={currentPageHandler}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!users && <BlankPage />}
          {users && (
            <>
              <Table
                rows={users as User[]}
                headings={tableHeaders}
                type="user_base"
              />
            </>
          )}
        </div>
        {/* {selectedUser?.length! > 0 && (
=======
    // const selectOrderHandler = (value: string, type: string) => {
    //     selectOrder(value, type, setSelectedUser, filteredUsers!, selectedUser!);
    // };

    // if (allUserIsLoading) {
    //     return <LoadingPage />;
    // }
    if (error) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <UserbasePageHeader
                    content="User Base"
                    allUsers={allUser?.data!}
                    filterByDate={filterByCreatedDate}
                    title="User Base | MazExpress Admin"
                    pageCount={pageCount}
                    currentPageHandler={currentPageHandler}
                    itemPerPageHandler={itemPerPageHandler!}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!allUser?.data && <BlankPage />}
                    {allUser?.data && (
                        <>
                            <Table rows={allUser.data} headings={tableHeaders} type="user_base" />
                        </>
                    )}
                </div>
                {/* {selectedUser?.length! > 0 && (
>>>>>>> translate
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
