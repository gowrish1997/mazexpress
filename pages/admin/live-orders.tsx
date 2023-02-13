import React, { useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import LiveOrderPageHeader from "@/components/admin/LiveOrderPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { useSelectOrder } from "@/lib/useSelectOrder";
import { IOrderResponse } from "@/models/order.interface";
import BlankPage from "@/components/admin/BlankPage";
import moment from "moment";
import { useFilter } from "@/lib/useFilter";
const tableHeaders = ["Customer", "MAZ Tracking ID", "Store Link", "Reference ID", "Created Date", "Warehouse", "Status"];

const LiveOrders = () => {
    const router = useRouter();

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders();

    const [allLiveOrders, setAllLiveOrders] = useState<IOrderResponse[]>();
    const [filteredLiveOrders, setFilteredAllLiveOrders] = useState<IOrderResponse[]>();

    const [statusFilterKey, setStatusFilterKey] = useState<string>("");
    const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] = useState<string>("");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<Date | string>("");
    const [selectedOrder, setSelectedOrder] = useState<string[]>();

    useEffect(() => {
        const liveOrders = orders?.filter((el) => {
            return el.status_orders !== "delivered";
        });
        setAllLiveOrders(liveOrders);
        setFilteredAllLiveOrders(liveOrders);
    }, [orders]);

    const filterByStatusHandler = (value: string) => {
        setStatusFilterKey(value);
        const liveOrders = useFilter(allLiveOrders!, createdDateFilterKey, mazTrackingIdFilterKey).filter((el) => {
            return el.status_orders.includes(value);
        });
        // .filter((el) => {
        //     if (createdDateFilterKey) {
        //         console.log("valye countable");
        //         return moment(el.created_on_orders).format("DD-MM-YYYY") === moment(createdDateFilterKey).format("DD-MM-YYYY");
        //     } else {
        //         console.log("vakuye nit cobnasjdb");
        //         return el;
        //     }
        // })
        // .filter((el) => {
        //     return el.id_orders.toLocaleLowerCase().includes(mazTrackingIdFilterKey?.toLocaleLowerCase()!);
        // });
        setFilteredAllLiveOrders(liveOrders);
    };

    const filterByMazTrackingId = (value: string) => {
        setMazTrackingIdFilterKey(value);
        const liveOrders = useFilter(allLiveOrders!, createdDateFilterKey, value).filter((el) => {
            return el.status_orders.includes(statusFilterKey);
        });
        // const liveOrder = allLiveOrders
        //     ?.filter((el) => {
        //         return el.id_orders.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        //     })
        //     .filter((el) => {
        //         if (createdDateFilterKey) {
        //             console.log("valye countable");
        //             return moment(el.created_on_orders).format("DD-MM-YYYY") === moment(createdDateFilterKey).format("DD-MM-YYYY");
        //         } else {
        //             console.log("vakuye nit cobnasjdb");
        //             return el;
        //         }
        //     })
        //     .filter((el) => {
        //         return el.status_orders.includes(statusFilterKey);
        //     });
        setFilteredAllLiveOrders(liveOrders);
    };

    const filterByCreatedDate = (value: Date | string) => {
        console.log(value);
        setCreatedDateFilterKey(value);
        const liveOrders = useFilter(allLiveOrders!, value, mazTrackingIdFilterKey).filter((el) => {
            return el.status_orders.includes(statusFilterKey);
        });
        // const liveOrder = allLiveOrders
        //     ?.filter((el) => {
        //         if (value) {
        //             console.log("valye countable");
        //             return moment(el.created_on_orders).format("DD-MM-YYYY") === moment(value).format("DD-MM-YYYY");
        //         } else {
        //             console.log("vakuye nit cobnasjdb");
        //             return el;
        //         }
        //     })
        //     .filter((el) => {
        //         return el.id_orders.toLocaleLowerCase().includes(mazTrackingIdFilterKey.toLocaleLowerCase());
        //     })
        //     .filter((el) => {
        //         return el.status_orders.includes(statusFilterKey);
        //     });
        setFilteredAllLiveOrders(liveOrders);
    };

    const selectOrderHandler = (value: string, type: string) => {
        useSelectOrder(value, type, setSelectedOrder, filteredLiveOrders!, selectedOrder!);
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
                />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!filteredLiveOrders && <BlankPage />}
                    {filteredLiveOrders && (
                        <>
                            <Table
                                rows={filteredLiveOrders}
                                headings={tableHeaders}
                                type="live_order"
                                onSelect={selectOrderHandler}
                                selectedOrder={selectedOrder!}
                                filterById={filterByMazTrackingId}
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

export default LiveOrders;
