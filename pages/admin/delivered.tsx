import React, { useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { IOrderResponse } from "@/models/order.interface";
import DeliveredPageHeader from "@/components/admin/DeliveredPageHeader";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import { filter } from "@/lib/filter";

const tableHeaders = [
  "Customer",
  "MAZ Tracking ID",
  "Store Link",
  "Reference ID",
  "Created Date",
  "Warehouse",
  "Status",
];

const DeliveredOrders = () => {
  const router = useRouter();
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({});

  const [allLiveOrders, setAllLiveOrders] = useState<IOrderResponse[]>();
  const [filteredLiveOrders, setFilteredAllLiveOrders] =
    useState<IOrderResponse[]>();

  const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] =
    useState<string>("");
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    string | Date
  >("");
  const [selectedOrder, setSelectedOrder] = useState<string[]>();

  useEffect(() => {
    const liveOrders = orders?.filter((el) => {
      return el.status_orders == "delivered";
    });
    setAllLiveOrders(liveOrders);
    setFilteredAllLiveOrders(liveOrders);
  }, [orders]);

  const filterByMazTrackingId = (value: string) => {
    setMazTrackingIdFilterKey(value);
    setFilteredAllLiveOrders(
      filter(allLiveOrders!, createdDateFilterKey, value)
    );
  };

  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
    setFilteredAllLiveOrders(
      filter(allLiveOrders!, value, mazTrackingIdFilterKey!)
    );
  };

  const selectOrderHandler = (value: string, type: string) => {
    selectOrder(value, type, setSelectedOrder, allLiveOrders!, selectedOrder!);
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
        <DeliveredPageHeader
          content="Delivered"
          allLiveOrders={allLiveOrders!}
          selectedOrder={selectedOrder}
          filterByDate={filterByCreatedDate}
          title='Delivered orders | MazExpress Admin'
          filterById={filterByMazTrackingId}
        />

        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!filteredLiveOrders && <BlankPage />}
          {filteredLiveOrders && (
            <>
              <Table
                rows={filteredLiveOrders}
                headings={tableHeaders}
                type="delivered"
                onSelect={selectOrderHandler}
                selectedOrder={selectedOrder!}
                
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
