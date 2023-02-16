import React, { useEffect, useState } from "react";
import Head from "next/head";
import useOrders from "@/lib/useOrders";
import ShipmentsPageHeader from "@/components/admin/ShipmentsPageHeader";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { IOrderResponse } from "@/models/order.interface";
import { selectOrder } from "@/lib/selectOrder";
import { filter } from "@/lib/filter";
import BlankPage from "@/components/admin/BlankPage";
import { ISearchKeyContext } from "@/models/SearchContextInterface";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";

const tableHeaders = ["Customer", "MAZ Tracking ID", "Store Link", "Reference ID", "Created Date", "Warehouse", "Status"];

const Shipments = () => {
    const router = useRouter();
    const { searchKey } = React.useContext(SearchKeyContext) as ISearchKeyContext;

    const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] = useState<string>("");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<string | Date>("");

    const [itemsPerPage, setItemPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(0);

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({ per_page: itemsPerPage, page: currentPage });

    const [allShipmentOrders, setAllShipmentOrders] = useState<IOrderResponse[]>();
    useEffect(() => {
        // const liveOrders = orders?.data?.filter((el) => {
        //     return el.status_orders == "at-warehouse";
        // });
        setAllShipmentOrders(orders?.data);
    }, [orders]);

    const [selectedOrder, setSelectedOrder] = useState<string[]>();

    const pageCount = Math.ceil(orders?.total_count! / itemsPerPage);

    const currentPageHandler = (value: number) => {
        setCurrentPage(value);
    };

    const filterByCreatedDate = (value: Date | string) => {
        setCreatedDateFilterKey(value);
    };

    const selectOrderHandler = (value: string, type: string) => {
        selectOrder(value, type, setSelectedOrder, allShipmentOrders!, selectedOrder!);
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
                <ShipmentsPageHeader
                    content="Today Shipments"
                    allLiveOrders={allShipmentOrders!}
                    selectedOrder={selectedOrder}
                    filterByDate={filterByCreatedDate}
                    title="Shipments for today | MazExpress Admin"
                    // filterById={filterByMazTrackingId}
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!allShipmentOrders && <BlankPage />}
                    {allShipmentOrders && (
                        <>
                            <Table rows={allShipmentOrders!} headings={tableHeaders} type="shipments" onSelect={selectOrderHandler} selectedOrder={selectedOrder!} />
                            <ReactPaginateComponent pageCount={pageCount} itemsPerPage={itemsPerPage} currentPageHandler={ currentPageHandler}   currentPage={currentPage} />
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

export default Shipments;
