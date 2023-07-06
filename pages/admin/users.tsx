import BlankPage from "@/components/admin/BlankPage";
import UserbasePageHeader from "@/components/admin/UserbasePageHeader";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import Table from "@/components/orders/table";
import useUsers from "@/lib/hooks/useUsers";
import { getDateInDBFormat } from "@/lib/utils";
import { User } from "@/models/user.model";
import { GetServerSidePropsContext } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import AdminPageWrapper from "@/components/common/AdminPageWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

interface ISearchKeyContext {
  searchKey: any;
}
const tableHeaders = [
  "Customer",
  "Customer ID",
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

  const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;
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
    return <LoadingPage />;
  }
  if (usersError) {
    return <div>some error happened</div>;
  }
  return (
    <AdminPageWrapper>
      <div>
        <UserbasePageHeader
          content="User Base"
          allUsers={users?.data as User[]}
          filterByDate={filterByCreatedDate}
          title="User Base | MazExpress Admin"
          pageCount={Math.ceil((users?.count as number) / itemsPerPage)}
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
      </div>
    </AdminPageWrapper>
  );
};

export default UserBase;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  const session = await getServerSession<any>(ctx.req, ctx.res, authOptions);
  // const { pathname } = ctx.req.url;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/gate?mode=1`,
        permanent: false,
      },
    };
  }

  if (ctx.locale == "ar" && ((session as any)?.user as any).is_admin) {
    return {
      redirect: {
        destination: `${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  if (!((session as any)?.user as any).is_admin) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}
