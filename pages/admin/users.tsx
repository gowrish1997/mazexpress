import React, { useState } from "react";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import BlankPage from "@/components/admin/BlankPage";
import useAllUser from "@/lib/hooks/useAllUsers";
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

const UserBase = () => {
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

  //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil((users as User[] || []).length / itemsPerPage);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
  };

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
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedUser?.length} orders are selected`}</div>
                )} */}
      </div>
    </>
  );
};

export default UserBase;
