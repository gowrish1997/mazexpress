import React, { useState, useCallback, useEffect } from "react";
import useOrders from "@/lib/hooks/useOrders";
import ShipmentsPageHeader from "@/components/admin/ShipmentsPageHeader";
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

const Shipments = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        string | Date
    >("");
    const [sort, setSort] = useState("desc");
    const [itemsPerPage, setItemPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        search: searchKey,
        per_page: itemsPerPage,
        page: currentPage,
        date: getDateInDBFormat(createdDateFilterKey as Date),
        status: ["at-warehouse"],
        sort:sort
    });

    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        console.log("use efft");
        router.push(router.asPath, router.asPath, { locale: "en" });
    }, []);

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
    const sortHandler = (value) => {
        setSort(value);
    };
    const selectOrderHandler = (value: string, type: string) => {
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
        <AdminPageWrapper>
            <div>
                <ShipmentsPageHeader
                    content="Today's Shipments"
                    allLiveOrders={orders?.data as Order[]}
                    selectedOrder={selectedOrder}
                    filterByDate={filterByCreatedDate}
                    title="Shipments for today | MazExpress Admin"
                    pageCount={Math.ceil(
                        (orders?.count as number) / itemsPerPage
                    )}
                    itemsPerPage={itemsPerPage}
                    createdDateFilterKey={createdDateFilterKey}
                    currentPageHandler={currentPageHandler}
                    currentPage={currentPage}
                    itemPerPageHandler={itemPerPageHandler!}
                    mutateOrder={mutateOrders}
                    setSelectedOrder={setSelectedOrder}
                    isFilterPresent={searchKey || createdDateFilterKey}
                    sorting={sortHandler}
                    sortValue={sort}
                    // filterById={filterByMazTrackingId}
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!orders?.data && !searchKey && !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <>
                            <Table
                                rows={orders?.data as Order[]}
                                headings={tableHeaders}
                                type="shipments"
                                onSelect={selectOrderHandler}
                                selectedOrder={selectedOrder!}
                                mutateOrder={mutateOrders}
                            />
                        </>
                    )}
                </div>
                {selectedOrder?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedOrder?.length} orders are selected`}</div>
                )}
            </div>
        </AdminPageWrapper>
    );
};

export default Shipments;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    const session = await getServerSession<any>(ctx.req, ctx.res, authOptions);
    // const { pathname } = ctx.req.url;
    console.log(session);
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
