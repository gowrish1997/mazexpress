import React, { useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import moment from "moment";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import useAllUser from "@/lib/useAllUsers";
import { IUser } from "@/models/user.interface";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";

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

  const { allUser, mutateAllUser, allUserIsLoading, error } = useAllUser({
    per_page: 3,
    page: 0,
  });
  //   console.log(allUser);

  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    Date | string
  >("");
  const [userFilterKey, setUserFilterKey] = useState<string>("");

  const [itemsPerPage, setItemPerPage] = useState(4);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  //   const currentUsers = filteredUsers?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers?.length / itemsPerPage);

  useEffect(() => {
    setAllUsers(allUser as IUser[]);
    setFilteredUsers(allUser as IUser[]);
  }, [allUser]);

  const itemOffsetHandler = (value: number) => {
    setItemOffset(value);
  };

  const filterByCreatedDate = (value: Date | string) => {
    setItemOffset(0);
    setCreatedDateFilterKey(value);
    const users = allUsers
      ?.filter((el) => {
        if (value) {
          return (
            moment(el.created_on_user).format("DD-MM-YYYY") ===
            moment(value).format("DD-MM-YYYY")
          );
        } else {
          return el;
        }
      })
      ?.filter((el) => {
        if (
          el.first_name_users
            .toLocaleLowerCase()
            .includes(userFilterKey?.toLocaleLowerCase()) ||
          el.last_name_users
            .toLocaleLowerCase()
            .includes(userFilterKey?.toLocaleLowerCase()) ||
          el.email_users
            .toLocaleLowerCase()
            .includes(userFilterKey?.toLocaleLowerCase())
        ) {
          return el;
        }
      });
    setFilteredUsers(users);
  };

  const filterByUser = (value: string) => {
    setItemOffset(0);
    setUserFilterKey(value);
    const users = allUsers
      ?.filter((el) => {
        if (
          el.first_name_users
            .toLocaleLowerCase()
            .includes(value?.toLocaleLowerCase()) ||
          el.last_name_users
            .toLocaleLowerCase()
            .includes(value?.toLocaleLowerCase()) ||
          el.email_users
            .toLocaleLowerCase()
            .includes(value?.toLocaleLowerCase())
        ) {
          return el;
        }
      })
      .filter((el) => {
        if (createdDateFilterKey) {
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

  // const selectOrderHandler = (value: string, type: string) => {
  //     selectOrder(value, type, setSelectedUser, filteredUsers!, selectedUser!);
  // };

  if (allUserIsLoading) {
    return <div>this is loading</div>;
  }
  if (error) {
    return <div>some error happened</div>;
  }
  return (
    <>
      <div>
        {/* <UserbasePageHeader
          content="User Base"
          allUsers={allUsers!}
          filterByUser={filterByUser}
          filterByDate={filterByCreatedDate}
          title="User Base | MazExpress Admin"
        /> */}
        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!filteredUsers && <BlankPage />}
          {filteredUsers && (
            <>
              {/* <Table
                rows={currentUsers}
                headings={tableHeaders}
                type="user_base"
              /> */}
              {/* <ReactPaginateComponent
                pageCount={pageCount}
                offsetHandler={itemOffsetHandler}
                itemsPerPage={itemsPerPage}
                item={filteredUsers}
              /> */}
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
