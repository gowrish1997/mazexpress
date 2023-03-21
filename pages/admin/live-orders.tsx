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

const tableHeaders = [
    "Customer",
    "MAZ Tracking ID",
    "Store Link",
    "Reference ID",
    "Created Date",
    //   "Warehouse",
    "Status",
];

const LiveOrders = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    console.log(searchKey);
    const [itemsPerPage, setItemPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [statusFilterKey, setStatusFilterKey] = useState<string[]>([
        "all status",
    ]);
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        Date | string
    >("");

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        per_page: itemsPerPage,
        page: currentPage,
        status:
            statusFilterKey.length == 0 || statusFilterKey[0] == "all status"
                ? ["pending", "in-transit", "at-warehouse", "delivered"]
                : statusFilterKey,
    });
    console.log(orders);

    const { locales, locale: activeLocale } = router;
    console.log(router.pathname);

    // useEffect(() => {
    //     // console.log("use efft");
    //     router.push(router.asPath, router.asPath, { locale: "en" });
    // }, []);
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
    // const filterByStatusHandler = (value: string[]) => {
    //     console.log('status changeing is calling')
    //     setStatusFilterKey(value);
    // };

    const filterByStatusHandler = useCallback((value: string[]) => {
        setStatusFilterKey(value);
        setCurrentPage(0);
    }, []);

    const filterByCreatedDate = useCallback((value: Date | string) => {
        setCreatedDateFilterKey(value);
    }, []);

    if (ordersIsLoading) {
        return <LoadingPage />;
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }
    console.log(orders || !statusFilterKey.includes("all status"));

    return (
        <>
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
                    statusFilterKey={statusFilterKey}
                    pageCount={Math.ceil(
                        (orders?.count as number) / itemsPerPage
                    )}
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!orders?.data &&
                        statusFilterKey.includes("all status") && <BlankPage />}

                    {(orders?.data ||
                        !statusFilterKey.includes("all status")) && (
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
        </>
    );
};

export default LiveOrders;
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
