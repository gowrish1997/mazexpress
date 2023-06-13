import React, { useCallback, useEffect, useState } from "react";
import useOrders from "@/lib/hooks/useOrders";
import LiveOrderPageHeader from "@/components/admin/LiveOrderPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import LoadingPage from "@/components/common/LoadingPage";
import { Order } from "@/models/order.model";
import BlankPage from "@/components/admin/BlankPage";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchKeyContext } from "@/components/common/Frame";
import { getDateInDBFormat } from "@/lib/utils";
import { GetServerSidePropsContext } from "next";
import AdminPageWrapper from "@/components/common/AdminPageWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const tableHeaders = [
    "Customer",
    "MAZ Tracking ID",
    "Store Link",
    "Reference ID",
    "Created Date",
    "Estimate delivery",

    "Status",
];

const LiveOrders = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    // console.log(searchKey);
    const [itemsPerPage, setItemPerPage] = useState<number>(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [statusFilterKey, setStatusFilterKey] = useState<string[]>([
        "all status",
    ]);
    const [sort, setSort] = useState("desc");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        Date | string
    >("");

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        search: searchKey,
        per_page: itemsPerPage,
        page: currentPage,
        date: getDateInDBFormat(createdDateFilterKey as Date),
        sort: sort,
        status:
            statusFilterKey.length == 0 || statusFilterKey[0] == "all status"
                ? [
                      "pending",
                      "in-transit",
                      "at-warehouse",
                      "out-for-delivery",
                      "delivered",
                  ]
                : statusFilterKey,
    });

    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        document.cookie = `NEXT_LOCALE=en;path=/`;
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", "ltr");
        document.querySelector("html")?.setAttribute("lang", "en");
    }, [router.locale]);

    const currentPageHandler = useCallback((value: number) => {
        setCurrentPage(value);
    }, []);
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0);
        setItemPerPage(value as number);
    }, []);

    const filterByStatusHandler = useCallback((value: string[]) => {
        setStatusFilterKey(value);
        setCurrentPage(0);
    }, []);

    const sortHandler = (value) => {
        setSort(value);
    };
    const filterByCreatedDate = useCallback((value: Date | string) => {
        setCreatedDateFilterKey(value);
    }, []);

    if (ordersIsLoading) {
        return <LoadingPage />;
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }
    

    return (
        <AdminPageWrapper>
            <div>
                <LiveOrderPageHeader
                    content="Live Orders"
                    allLiveOrders={orders?.data as Order[]}
                    onChangeStatus={filterByStatusHandler}
                    itemPerPageHandler={itemPerPageHandler!}
                    filterByDate={filterByCreatedDate}
                    title="Live Orders | MazExpress Admin"
                    currentPageHandler={currentPageHandler}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    createdDateFilterKey={createdDateFilterKey}
                    statusFilterKey={statusFilterKey}
                    sorting={sortHandler}
                    sortValue={sort}
                    pageCount={Math.ceil(
                        (orders?.count as number) / itemsPerPage
                    )}
                    isFilterPresent={
                        searchKey ||
                        createdDateFilterKey ||
                        !statusFilterKey.includes("all status")
                    }
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!orders?.data &&
                    statusFilterKey.includes("all status") &&
                    !searchKey &&
                    !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <>
                            <Table
                                rows={orders?.data as Order[]}
                                headings={tableHeaders}
                                type="live_order"
                            />
                        </>
                    )}
                </div>
            </div>
        </AdminPageWrapper>
    );
};

export default LiveOrders;

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
