import React, { useCallback, useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import LiveOrderPageHeader from "@/components/admin/LiveOrderPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
import { IOrderResponse } from "@/models/order.interface";
import BlankPage from "@/components/admin/BlankPage";
import { filter } from "@/lib/filter";
import { selectOrder } from "@/lib/selectOrder";
import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";

const tableHeaders = ["Customer", "MAZ Tracking ID", "Store Link", "Reference ID", "Created Date", "Warehouse", "Status"];

const LiveOrders = () => {
    const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;

    const router = useRouter();
    const [itemsPerPage, setItemPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [statusFilterKey, setStatusFilterKey] = useState<string[]>([]);
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        per_page: itemsPerPage,
        page: currentPage,
        status: statusFilterKey.length == 0 ? ["pending", "in-transit", "at-warehouse", "delivered"] : statusFilterKey,
    });

    const pageCount = Math.ceil(orders?.total_count! / itemsPerPage);

    // const currentPageHandler = useCallback((value: number) => {
    //     setCurrentPage(value);
    // }, []);
    // const itemPerPageHandler = useCallback((value: string | number) => {
    //     setItemPerPage(value as number);
    // }, []);

    // const filterByStatusHandler = (value: string[]) => {
    //     console.log('status changeing is calling')
    //     setStatusFilterKey(value);
    // };

    const filterByStatusHandler = useCallback((value: string[]) => {
        setStatusFilterKey(value);
        setCurrentPage(0)
    }, []);

    // const filterByCreatedDate = useCallback((value: Date | string) => {
    //     setCreatedDateFilterKey(value);
    // }, []);

    useEffect(() => {
        console.log("live order useEffect");
    }, []);

    if (ordersIsLoading) {
        return <LoadingPage />;
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }

    console.log(statusFilterKey);
    return (
        <>
            <div>
                <LiveOrderPageHeader
                    content="Live Orders"
                    // allLiveOrders={orders?.data!.length!}
                    onChangeStatus={filterByStatusHandler}
                    // itemPerPageHandler={itemPerPageHandler!}
                    // filterByDate={filterByCreatedDate}
                    title="Live Orders | MazExpress Admin"
                    pageCount={pageCount}
                    // currentPageHandler={currentPageHandler}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {/* {!filteredLiveOrders && <BlankPage />} */}

                    {orders?.data && (
                        <>
                            <Table rows={orders.data!} headings={tableHeaders} type="live_order" />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default LiveOrders;
