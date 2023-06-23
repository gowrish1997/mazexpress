import useOrderCount from "@/lib/hooks/useOrderCount";
import ProgressBar1 from "./ProgressBar";
const OrdersTotalCountBar = () => {
  const {
    orderCount: totalOrders,
    mutateOrderCount: mutateTotalOrders,
    orderCountIsLoading: totalOrdersIsLoading,
  } = useOrderCount({
    status: ["delivered", "in-transit", "out-for-delivery", "at-warehouse"],
  });

  const {
    orderCount: deliveredOrders,
    mutateOrderCount: mutateDeliveredOrders,
    orderCountIsLoading: deliveredOrdersIsLoading,
  } = useOrderCount({ status: ["delivered"] });

  const {
    orderCount: inTransitOrders,
    mutateOrderCount: mutateInTransitOrders,
    orderCountIsLoading: inTransitOrdersIsLoading,
  } = useOrderCount({ status: ["in-transit"] });

  const {
    orderCount: outOrders,
    mutateOrderCount: mutateOutOrders,
    orderCountIsLoading: outOrdersIsLoading,
  } = useOrderCount({ status: ["out-for-delivery"] });

  const {
    orderCount: atWarehouseOrders,
    mutateOrderCount: mutateAtWarehouseOrders,
    orderCountIsLoading: atWarehouseOrdersIsLoading,
  } = useOrderCount({ status: ["at-warehouse"] });

  const {
    orderCount: atPendingOrders,
    mutateOrderCount: mutateAtPendingOrders,
    orderCountIsLoading: atPendingOrdersIsLoading,
  } = useOrderCount({ status: ["pending"] });

  return (
    <div
      className="p-[10px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full space-y-[0px]"
      style={{ width: "calc(33% - 2px)" }}
    >
      <h1 className="text-[14px] text-[#18181B] font-[600] leading-[24px] ">
        MAZ Stats
      </h1>
      <div className="space-y-[25px]">
        <ProgressBar1
          title="Delivered Orders"
          orderCount={deliveredOrders as number}
          orderCountPer={((deliveredOrders as number) / totalOrders) * 100}
        />
        <ProgressBar1
          title="In Transit"
          orderCount={inTransitOrders as number}
          orderCountPer={((inTransitOrders as number) / totalOrders) * 100}
        />
        <ProgressBar1
          title="Out For Delivery"
          orderCount={outOrders as number}
          orderCountPer={((outOrders as number) / totalOrders) * 100}
        />
        <ProgressBar1
          title="At Warehouse"
          orderCount={atWarehouseOrders as number}
          orderCountPer={((atWarehouseOrders as number) / totalOrders) * 100}
        />
        <ProgressBar1
          title="Pending"
          orderCount={atPendingOrders as number}
          orderCountPer={((atPendingOrders as number) / totalOrders) * 100}
        />
      </div>
    </div>
  );
};

export default OrdersTotalCountBar;
