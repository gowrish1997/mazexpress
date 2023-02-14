import React, { useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import useAllUser from "@/lib/useAllUsers";
import { IUser } from "@/models/user.interface";
import moment from "moment";

const tableHeaders = [
  "Customer",
  "Email ID",
  "Mobile numbers",
  "Created Date",
  "Age",
  "Gender",
];

const UserBase = () => {
  const router = useRouter();

  const { allUser, mutateAllUser, allUserIsLoading, error } = useAllUser({});
  // console.log(allUser);

  const [allUsers, setAllUsers] = useState<IUser[]>(allUser!);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(allUser!);
  const [selectedUser, setSelectedUser] = useState<number[]>();
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    Date | string
  >("");

  useEffect(() => {
    setAllUsers(allUser!);
    setFilteredUsers(allUser!);
  }, [allUser]);

  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
    const users = allUsers?.filter((el) => {
      if (value) {
        return (
          moment(el.created_on_user).format("DD-MM-YYYY") ===
          moment(value).format("DD-MM-YYYY")
        );
      } else {
        return el;
      }
    });
    setFilteredUsers(users);
  };

  const selectOrderHandler = (value: string, type: string) => {
    selectOrder(value, type, setSelectedUser, filteredUsers!, selectedUser!);
  };

  if (allUserIsLoading) {
    return <div>this is loading</div>;
  }
  if (error) {
    return <div>some error happened</div>;
  }
  return (
    <>
      <div>
        <UserbasePageHeader
          content="User Base"
          allUsers={allUsers!}
          selectedUser={selectedUser}
          filterByDate={filterByCreatedDate}
        />
        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!filteredUsers && <BlankPage />}
          {filteredUsers && (
            <>
              <Table
                rows={filteredUsers}
                headings={tableHeaders}
                type="user_base"
                onSelect={selectOrderHandler}
                selectedOrder={selectedUser!}
              />
            </>
          )}
        </div>
        {selectedUser?.length! > 0 && (
          <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedUser?.length} orders are selected`}</div>
        )}
      </div>
    </>
  );
};

export default UserBase;
