import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useOrders from "@/lib/useOrders";
import LiveOrderPageHeader from "@/components/admin/LiveOrderPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { useSelectOrder } from "@/components/customHook.ts/useSelectOrder";
import { IOrderResponse } from "@/models/order.interface";

const tableHeaders = ["Customer", "MAZ Tracking ID", "Store Link", "Reference ID", "Created Date", "Warehouse", "Status"];

const LiveOrders = () => {
    const router = useRouter();

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders();

    const [allLiveOrders, setAllLiveOrders] = useState<IOrderResponse[]>();
    const [filteredLiveOrders, setFilteredAllLiveOrders] = useState<IOrderResponse[]>();

    const [statusFilterKey, setStatusFilterKey] = useState<string>("");
    const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] = useState<string>("");
    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<string>("");
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
        const liveOrder = allLiveOrders
            ?.filter((el) => {
                return el.status_orders.includes(value);
            })
            .filter((el) => {
                return el.id_orders.toLocaleLowerCase().includes(mazTrackingIdFilterKey?.toLocaleLowerCase()!);
            });
        setFilteredAllLiveOrders(liveOrder);
    };

    const filterByMazTrackingId = (value: string) => {
        setMazTrackingIdFilterKey(value);
        const liveOrder = allLiveOrders
            ?.filter((el) => {
                return el.id_orders.toLocaleLowerCase().includes(value.toLocaleLowerCase());
            })
            .filter((el) => {
                return el.status_orders.includes(statusFilterKey);
            });
        setFilteredAllLiveOrders(liveOrder);
    };

    const selectOrderHandler = (value:string, type: string) => {
        useSelectOrder(value, type, setSelectedOrder, allLiveOrders!,selectedOrder!);
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
                <LiveOrderPageHeader content="Live Orders" allLiveOrders={allLiveOrders!} onChangeStatus={filterByStatusHandler} selectedOrder={selectedOrder} />
                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {!filteredLiveOrders && (
                        <div className="flex-1 flex flex-col justify-center items-center w-full ">
                            <div className="relative h-[221px] w-[322px] ">
                                <Image src="/noorder.png" fill style={{ objectFit: "contain" }} alt="happy" />
                            </div>
                            <div className=" w-[375px] h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] text-center ">
                                Oops, there are no orders on your list yet... Start adding now.
                                <br />
                                <Link href={`${router.pathname}/add-new-order`}>
                                    <span className="text-[#0057FF] font-[500] p-[5px] rounded-[4px] hover:bg-[#EDF5F9] ">Add Order Now</span>
                                </Link>
                            </div>
                        </div>
                    )}
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
