import React, { useEffect, useState,useCallback } from "react";
import useOrders from "@/lib/useOrders";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { IOrderResponse } from "@/models/order.interface";
import DeliveredPageHeader from "@/components/admin/DeliveredPageHeader";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import { filter } from "@/lib/filter";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const tableHeaders = [
    "Customer",
    "MAZ Tracking ID",
    "Store Link",
    "Reference ID",
    "Created Date",
    // "Warehouse",
    "Status",
  ];

const DeliveredOrders = () => {
    const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;
    const router = useRouter();

    const [itemsPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] = useState<string>("");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        per_page: itemsPerPage,
        page: currentPage,
        status: ["delivered"],
    });

    const { locales, locale: activeLocale } = router;

  useEffect(() => {
      console.log("use efft");
      router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

    const [allDeliveredOrders, setAllDeliveredOrders] = useState<IOrderResponse[]>();

    const [selectedOrder, setSelectedOrder] = useState<string[]>();

    const pageCount = Math.ceil(orders?.total_count! / itemsPerPage);

    const currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0)
        setItemPerPage(value as number);
    }, []);

    const filterByCreatedDate = (value: Date | string) => {
        setCreatedDateFilterKey(value);
    };

    const selectOrderHandler = (value: string, type: string) => {
        selectOrder(value, type, setSelectedOrder, allDeliveredOrders!, selectedOrder!);
    };
    if (ordersIsLoading) {
        // return <LoadingPage />;
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <DeliveredPageHeader
                    content="Delivered"
                    allLiveOrders={orders?.data!}
                    selectedOrder={selectedOrder}
                    filterByDate={filterByCreatedDate}
                    title="Delivered orders | MazExpress Admin"
                    pageCount={pageCount}
                    itemsPerPage={itemsPerPage}
                    currentPageHandler={currentPageHandler}
                    currentPage={currentPage}
                    itemPerPageHandler={itemPerPageHandler!}
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!orders?.data && <BlankPage />}
                    {orders?.data && (
                        <>
                            <Table rows={orders?.data!} headings={tableHeaders} type="delivered" onSelect={selectOrderHandler} selectedOrder={selectedOrder!} />
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
