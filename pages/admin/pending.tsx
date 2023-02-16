import React, { useEffect, useState } from "react";
import useOrders from "@/lib/useOrders";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { IOrderResponse } from "@/models/order.interface";
import PendingPageHeader from "@/components/admin/PendingPageHeader";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import ReactPaginateComponent from "@/components/admin/ReactPaginate";
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

const PendingOrders = () => {
  const router = useRouter();
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    status: "pending",
  });



  const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] =
    useState<string>("");

  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    string | Date
  >("");

  const [selectedOrder, setSelectedOrder] = useState<string[]>();

  const [perPage, setPerPage] = useState(20);
  const [page, setPerPage] = useState(20);
  const pageCount = Math.ceil(filteredLiveOrders?.length! / itemsPerPage);

  const itemOffsetHandler = (value: number) => {
    setItemOffset(value);
  };

  const filterByMazTrackingId = (value: string) => {
    setItemOffset(0);
    setMazTrackingIdFilterKey(value);
    setFilteredAllLiveOrders(
      filter(allPendingOrders!, createdDateFilterKey, value)
    );
  };

  const filterByCreatedDate = (value: Date | string) => {
    setItemOffset(0);
    setCreatedDateFilterKey(value);
    setFilteredAllLiveOrders(
      filter(allPendingOrders!, value, mazTrackingIdFilterKey!)
    );
  };

  const selectOrderHandler = (value: string, type: string) => {
    selectOrder(
      value,
      type,
      setSelectedOrder,
      allPendingOrders!,
      selectedOrder!
    );
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
        <PendingPageHeader
          content="pending"
          allLiveOrders={orders?.data}
          selectedOrder={selectedOrder}
          filterByDate={filterByCreatedDate}
          title="Pending Orders | MazExpress Admin"
          filterById={filterByMazTrackingId}
        />

        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!orders && <BlankPage />}
          {orders && (
            <>
              <Table
                rows={orders.data!}
                headings={tableHeaders}
                type="pending"
                onSelect={selectOrderHandler}
                selectedOrder={selectedOrder!}
              />
              <ReactPaginateComponent
                pageCount={pageCount}
                offsetHandler={itemOffsetHandler}
                itemsPerPage={itemsPerPage}
                item={orders.data!}
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

export default PendingOrders;
