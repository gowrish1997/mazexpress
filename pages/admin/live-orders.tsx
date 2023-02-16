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
const tableHeaders = ["Customer", "MAZ Tracking ID", "Store Link", "Reference ID", "Created Date", "Warehouse", "Status"];

const LiveOrders = () => {
    const router = useRouter();
    const [itemsPerPage, setItemPerPage] = useState(4);

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({ per_page:7, page: 1 });
    console.log(orders)

    const [allLiveOrders, setAllLiveOrders] = useState<IOrderResponse[]>();
    const [filteredLiveOrders, setFilteredAllLiveOrders] = useState<IOrderResponse[]>();

    const [statusFilterKey, setStatusFilterKey] = useState<string[]>([]);
    const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] = useState<string>("");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");
    const [selectedOrder, setSelectedOrder] = useState<string[]>();

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentOrders = allLiveOrders?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allLiveOrders?.length! / itemsPerPage);

    useEffect(() => {
        setAllLiveOrders(orders);
        // setFilteredAllLiveOrders(orders);
    }, [orders]);

    const itemOffsetHandler = (value: number) => {
        setItemOffset(value);
    };

    const filterByStatusHandler = (value: string[]) => {
        setItemOffset(0);
        setStatusFilterKey(value);
        const liveOrders = filter(allLiveOrders!, createdDateFilterKey, mazTrackingIdFilterKey).filter((el) => {
            if (value.length > 0) {
                return value.includes(el.status_orders);
            } else {
                return el;
            }
        });

        setFilteredAllLiveOrders(liveOrders);
    };

    const filterByMazTrackingId = (value: string) => {
        setItemOffset(0);
        setMazTrackingIdFilterKey(value);
        const liveOrders = filter(allLiveOrders!, createdDateFilterKey, value).filter((el) => {
            if (statusFilterKey.length > 0) {
                return statusFilterKey.includes(el.status_orders);
            } else {
                return el;
            }
        });

        setFilteredAllLiveOrders(liveOrders);
    };

    const filterByCreatedDate = (value: Date | string) => {
        setItemOffset(0);
        setCreatedDateFilterKey(value);
        const liveOrders = filter(allLiveOrders!, value, mazTrackingIdFilterKey).filter((el) => {
            if (statusFilterKey.length > 0) {
                return statusFilterKey.includes(el.status_orders);
            } else {
                return el;
            }
        });

        setFilteredAllLiveOrders(liveOrders);
    };

    const selectOrderHandler = (value: string, type: string) => {
        selectOrder(value, type, setSelectedOrder, filteredLiveOrders!, selectedOrder!);
    };

    if (ordersIsLoading) {
        return <div>this is loading</div>;
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
                    selectedOrder={selectedOrder!}
                    filterByDate={filterByCreatedDate}
                    filterById={filterByMazTrackingId}
                    title="Live Orders | MazExpress Admin"
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {/* {!filteredLiveOrders && <BlankPage />} */}
                    {/* {filteredLiveOrders && (
            <>
              <Table
                rows={currentUsers!}
                headings={tableHeaders}
                type="live_order"
                onSelect={selectOrderHandler}
                selectedOrder={selectedOrder!}
              />
              <ReactPaginateComponent
                pageCount={pageCount}
                offsetHandler={itemOffsetHandler}
                itemsPerPage={itemsPerPage}
                item={filteredLiveOrders}
              />
            </>
          )} */}
                    {allLiveOrders && (
                        <>
                            <Table rows={currentOrders!} headings={tableHeaders} type="live_order" onSelect={selectOrderHandler} selectedOrder={selectedOrder!} />
                            <ReactPaginateComponent pageCount={pageCount} offsetHandler={itemOffsetHandler} itemsPerPage={itemsPerPage} item={allLiveOrders} />
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

export default LiveOrders;
