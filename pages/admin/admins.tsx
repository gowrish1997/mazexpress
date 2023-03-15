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

const tableHeaders = [
  "Customer",
  "Email ID",
  "Mobile Number",
  "Created Date",
  "Age",
  "Gender",
  "Total Orders",
];
interface ISearchKeyContext {
  searchKey: any;
}
const AdminBase = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  useEffect(() => {
    console.log("use efft");
    router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

  const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    Date | string
  >("");

  const { users, mutateUsers } = useUsers({
    page: currentPage,
    per_page: itemsPerPage,
  });

  const { users: totalUsersCount } = useUsers({ count_all: true, count: true });

  const [showAddNewAdminModal, setShowAddNewAdminModal] = useState(false);

  //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil((totalUsersCount as number) / itemsPerPage);

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
    setShowAddNewAdminModal((prev) => !prev);
  };

  //   if (error) {
  //     return <div>some error happened</div>;
  //   }
  return (
    <>
      <div>
        <UserbasePageHeader
          content="Admin Base"
          allUsers={users as User[]}
          filterByDate={filterByCreatedDate}
          title="Admin Base | MazExpress Admin"
          pageCount={pageCount}
          currentPageHandler={currentPageHandler}
          //   itemPerPageHandler={itemPerPageHandler!}
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
              <AddButton onClick={ToggleAddNewAdminModalHandler} />
            </>
          )}
        </div>
        {/* {selectedUser?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedUser?.length} orders are selected`}</div>
                )} */}
      </div>
      {/* <AddNewAdminModal/> */}
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
