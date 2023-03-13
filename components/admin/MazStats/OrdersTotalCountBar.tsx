import useOrders from "@/lib/hooks/useOrders";
import React from "react";

import ProgressBar1 from "./ProgressBar";
const OrdersTotalCountBar = () => {
  const {
    orders: totalOrders,
    mutateOrders: mutateTotalOrders,
    ordersIsLoading: totalOrdersIsLoading,
  } = useOrders({ count: true, count_all: true });

  const {
    orders: deliveredOrders,
    mutateOrders: mutateDeliveredOrders,
    ordersIsLoading: deliveredOrdersIsLoading,
  } = useOrders({ count: true, status: ["delivered"] });

  const {
    orders: inTransitOrders,
    mutateOrders: mutateInTransitOrders,
    ordersIsLoading: inTransitOrdersIsLoading,
  } = useOrders({ count: true, status: ["in-transit"] });

  const {
    orders: outOrders,
    mutateOrders: mutateOutOrders,
    ordersIsLoading: outOrdersIsLoading,
  } = useOrders({ count: true, status: ["out-for-delivery"] });

  const {
    orders: atWarehouseOrders,
    mutateOrders: mutateAtWarehouseOrders,
    ordersIsLoading: atWarehouseOrdersIsLoading,
  } = useOrders({ count: true, status: ["at-warehouse"] });

  return (
    <div
      className="p-[10px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full space-y-[30px]"
      style={{ width: "calc(33% - 2px)" }}
    >
      <h1 className="text-[14px] text-[#18181B] font-[600] leading-[24px] ">
        MAZ Stats
      </h1>
      <div className="space-y-[25px]">
        <ProgressBar1
          title="Delivered Orders"
          orderCount={deliveredOrders as number}
          orderCountPer={(deliveredOrders as number) / (totalOrders as number)}
        />
        <ProgressBar1
          title="In Transit"
          orderCount={inTransitOrders as number}
          orderCountPer={(inTransitOrders as number) / (totalOrders as number)}
        />
        <ProgressBar1
          title="Out For Delivery"
          orderCount={outOrders as number}
          orderCountPer={(outOrders as number) / (totalOrders as number)}
        />
        <ProgressBar1
          title="At Warehouse"
          orderCount={atWarehouseOrders as number}
          orderCountPer={80}
        />
      </div>
    </div>
  );
};

export default OrdersTotalCountBar;
