import React, { useEffect, useState } from "react";
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
    const [itemsPerPage, setItemPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(0);
    const [statusFilterKey, setStatusFilterKey] = useState<string[]>([]);
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({ per_page: itemsPerPage, page: currentPage });

    const [allLiveOrders, setAllLiveOrders] = useState<IOrderResponse[]>();

    useEffect(() => {
        console.log(orders);
        setAllLiveOrders(orders?.data);
    }, [orders]);

    const pageCount = Math.ceil(orders?.total_count! / itemsPerPage);

    const  currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };

    const filterByStatusHandler = (value: string[]) => {
        setStatusFilterKey(value);
    };

    const filterByCreatedDate = (value: Date | string) => {
        setCreatedDateFilterKey(value);
    };

    if (ordersIsLoading) {
        return <LoadingPage/>
    }
    if (ordersError) {
        return <div>some error happened</div>;
    }
    return (
        <>
            <div>
                <LiveOrderPageHeader
                    content="Live Orders"
                    allLiveOrders={allLiveOrders!}
                    onChangeStatus={filterByStatusHandler}
                    filterByDate={filterByCreatedDate}
                    title="Live Orders | MazExpress Admin"
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {/* {!filteredLiveOrders && <BlankPage />} */}

                    {allLiveOrders && (
                        <>
                            <Table rows={allLiveOrders!} headings={tableHeaders} type="live_order" />
                            <ReactPaginateComponent pageCount={pageCount}  currentPageHandler={ currentPageHandler} itemsPerPage={itemsPerPage} currentPage={currentPage} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default LiveOrders;
