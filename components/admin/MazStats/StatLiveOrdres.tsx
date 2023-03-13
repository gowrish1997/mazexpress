import React from "react";
import Link from "next/link";
import useOrders from "@/lib/hooks/useOrders";
import Table from "@/components/orders/table";
import { Order } from "@/models/order.model";

const StatLiveOrdres = () => {
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    per_page: 5,
    status: ["pending", "in-transit", "at-warehouse", "delivered"],
  });

  const tableHeaders = ["Customer", "MAZ Tracking ID", "Warehouse", "Status"];
  return (
    <div className="flex-type6 w-2/3 flex-1 p-[10px] mr-[1px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full">
      <div className="w-full flex-type3">
        <p className="text-[14px] text-[#18181B] font-[600] leading-[24px]">
          Live Orders[{(orders as Order[]).length}]
        </p>
        <Link href="/admin/live-orders">
          <p className="text-[12px] text-[#3672DF] font-[500] leading-[21px] cursor-pointer">{`See All Live Orders >`}</p>
        </Link>
      </div>
      {orders && (
        <div className="">
          <Table
            rows={orders as Order[]}
            headings={tableHeaders}
            type="stat_table"
          />
        </div>
      )}
    </div>
  );
};

export default StatLiveOrdres;
