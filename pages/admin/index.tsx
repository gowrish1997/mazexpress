import React from "react";
import TotalOrders from "@/components/admin/MazStats/TotalOrders";
import TotalCustomer from "@/components/admin/MazStats/TotalCustomer";
import WarehouseOrders from "@/components/admin/MazStats/WarehouseOrders";
import { useSession } from "next-auth/react";
import StatGraph from "@/components/admin/MazStats/StatGraph";
import OrdersTotalCountBar from "@/components/admin/MazStats/OrdersTotalCountBar";
import StatLiveOrdres from "@/components/admin/MazStats/StatLiveOrdres";
import RecentCustomers from "@/components/admin/MazStats/RecentCustomers";

const AdminHome = () => {
  const { data: session, status } = useSession();
  return (
    <div className="space-y-[15px]">
      <p className="text-[16px] text-[#18181B] font-[700] leading-[24px]">
        Hey Muhammad Ali -
        <span className="text-[16px] text-[#71717A] font-[400] leading-[26px] ">
          here’s what’s happening at your warehouse
        </span>
      </p>
      <div className="flex-type3 gap-x-[10px]">
        <TotalOrders />
        <TotalCustomer />
        <WarehouseOrders />
      </div>
      <div className="flex-type3 gap-x-[10px] h-[300px]">
        <StatGraph />
        <OrdersTotalCountBar />
      </div>
      <div className="flex-type3 gap-x-[10px]  h-[420px]">
        <StatLiveOrdres />
        <RecentCustomers />
      </div>
    </div>
  );
};

export default AdminHome;
