import React, { useEffect, useState } from "react";
import Head from "next/head";
import ReactDropdown from "../common/ReactDropdown";
import useUser from "@/lib/useUser";
import useOrders from "@/lib/useOrders";
interface IProp {
  content: string;
  className?: string;
  showCalender?: boolean;
  title?: string;
}

const AdminPageHeader = (props: IProp) => {
  const { user, mutateUser } = useUser();
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({});
  // console.log(orders);

  const [packageStatusDropDownOptoin, setPackageStatusDropDownOptoin] =
    useState();
  const [warehousesDropDownOptoin, setWarehousesDropdownOption] = useState();

  useEffect(() => {}, []);

  return (
    <div
      className={
        "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "
      }
    >
      <Head>
        <title>{props.title}</title>
      </Head>
      <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">
        {props.content}
      </p>
      <div className="flex-type1 space-x-[10px] ">
        <ReactDropdown />
        <ReactDropdown />
        <button className="box-border border-[1px] border-[#BBC2CF] py-[8px] px-[10px] rounded-[4px] mt-[5px] ">
          Move to shipments
        </button>
      </div>
    </div>
  );
};

export default AdminPageHeader;
