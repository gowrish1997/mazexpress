//==========================
//     co-author: raunak
//     co-author: gowrish
//==========================

import React, { useEffect, useState, useCallback } from "react";
import useOrders from "@/lib/hooks/useOrders";
import InTransitPageHeader from "@/components/admin/InTransitPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import LoadingPage from "@/components/common/LoadingPage";
import { Order } from "@/models/order.model";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchKeyContext } from "@/components/common/Frame";
import { getDateInDBFormat } from "@/lib/utils";
import { GetServerSidePropsContext } from "next";

const tableHeaders = [
    "Customer",
    "MAZ Tracking ID",
    "Store Link",
    "Reference ID",
    "Created Date",
    "Estimate delivery",
    "Status",
];

const Intransit = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    const [itemsPerPage, setItemPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);

    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        string | Date
    >("");
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        search: searchKey,
        per_page: itemsPerPage,
        page: currentPage,
        status: ["in-transit", "out-for-delivery"],
        date: getDateInDBFormat(createdDateFilterKey as Date),
    });

    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        // console.log("use efft");
        router.push(router.asPath, router.asPath, { locale: "en" });
    }, []);

    const [allInTransitOrders, setallInTransitOrders] = useState<Order[]>();

    const [selectedOrder, setSelectedOrder] = useState<Order[]>();

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

    const selectOrderHandler = (value: string, type: string) => {
        console.log(value);
        selectOrder(
            value,
            type,
            setSelectedOrder,
            orders?.data as Order[],
            selectedOrder!
        );
    };

    if (ordersIsLoading) {
        return <LoadingPage />;
    }

    if (ordersError) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <InTransitPageHeader
                    content="in-transit"
                    allLiveOrders={orders?.data as Order[]}
                    filterByDate={filterByCreatedDate}
                    selectedOrder={selectedOrder as Order[]}
                    title="In-Transit | MazExpress Admin"
                    pageCount={Math.ceil(
                        (orders?.count as number) / itemsPerPage
                    )}
                    currentPageHandler={currentPageHandler}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    itemPerPageHandler={itemPerPageHandler!}
                    mutateOrder={mutateOrders}
                    setSelectedOrder={setSelectedOrder}
                    createdDateFilterKey={createdDateFilterKey}
                    isFilterPresent={searchKey || createdDateFilterKey}
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!orders?.data && !searchKey && !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <>
                            <Table
                                rows={orders?.data as Order[]}
                                headings={tableHeaders}
                                type="in-transit"
                                onSelect={selectOrderHandler}
                                selectedOrder={selectedOrder!}
                                mutateOrder={mutateOrders}
                            />
                        </>
                    )}
                </div>
                {selectedOrder?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedOrder?.length} orders are selected (need to select identical status orders for bulk action)`}</div>
                )}
            </div>
        </>
    );
};

export default Intransit;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    // console.log("redders", ctx.req.cookies);
    // if (ctx.req.cookies.is_admin !== "true") {
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
