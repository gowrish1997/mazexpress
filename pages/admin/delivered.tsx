import BlankPage from "@/components/admin/BlankPage";
import DeliveredPageHeader from "@/components/admin/DeliveredPageHeader";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import Table from "@/components/orders/table";
import useOrders from "@/lib/hooks/useOrders";
import { getDateInDBFormat } from "@/lib/utils";
import { Order } from "@/models/order.model";
import { GetServerSidePropsContext } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const tableHeaders = [
    "Customer",
    "MAZ Tracking ID",
    "Store Link",
    "Reference ID",
    "Created Date",
    "Delivered",
    "Status",
];

const DeliveredOrders = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    const [itemsPerPage, setItemPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);

    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        Date | string
    >("");
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        search: searchKey,
        per_page: itemsPerPage,
        page: currentPage,
        date: getDateInDBFormat(createdDateFilterKey as Date),
        status: ["delivered"],
    });

    const { locales, locale: activeLocale } = router;

    // useEffect(() => {
    //   console.log("use efft");
    //   router.push(router.asPath, router.asPath, { locale: "en" });
    // }, []);

    const [selectedOrder, setSelectedOrder] = useState<string[]>();

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

    // const selectOrderHandler = (value: string, type: string) => {
    //     selectOrder(value, type, setSelectedOrder);
    // };

    if (ordersIsLoading) {
        return <LoadingPage />;
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <DeliveredPageHeader
                    content="Delivered"
                    allLiveOrders={orders?.data as Order[]}
                    filterByDate={filterByCreatedDate}
                    title="Delivered orders | MazExpress Admin"
                    pageCount={Math.ceil(
                        (orders?.count as number) / itemsPerPage
                    )}
                    itemsPerPage={itemsPerPage}
                    createdDateFilterKey={createdDateFilterKey}
                    currentPageHandler={currentPageHandler}
                    currentPage={currentPage}
                    itemPerPageHandler={itemPerPageHandler!}
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
                                type="delivered"
                                // onSelect={selectOrderHandler}
                            />
                        </>
                    )}
                </div>
                {selectedOrder?.length! > 0 && (
                    <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedOrder?.length} orders are selected`}</div>
                )}
            </div>
        </>
    );
};

export default DeliveredOrders;
// export async function getStaticProps({ locale }: { locale: any }) {
//     if (process.env.NODE_ENV === "development") {
//         await i18n?.reloadResources();
//     }
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ["common"])),
//         },
//     };
// }
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
