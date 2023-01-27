import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import PageHeaders from "@/components/orders/PageHeader";
import Table from "@/components/orders/table";
import { IOrder } from "@/models/order.interface";
import AddButton from "@/common/AddButton";
import useUser from "@/lib/useUser";
import useOrders from "@/lib/useOrders";

const tableHeaders = [
  "MAZ Tracking ID",
  "Store",
  "Reference ID",
  "Estimated Deliver",
  "Address",
  "Status",
];

const data = [
  {
    id: nanoid(),
    mazTrackingId: "asfnaksf",
    storeLink: "flilkaer",
    referenceId: "akjsfnka",
    estimateDelivery: "fknaskf",
    address: "afanslf",
    status: "In Transit",
  },
  {
    id: nanoid(),
    mazTrackingId: "asfnaksf",
    storeLink: "flilkaer",
    referenceId: "akjsfnka",
    estimateDelivery: "fknaskf",
    address: "afanslf",
    status: "Delivered",
  },
  {
    id: nanoid(),
    mazTrackingId: "asfnaksf",
    storeLink: "flilkaer",
    referenceId: "akjsfnka",
    estimateDelivery: "fknaskf",
    address: "afanslf",
    status: "At warehouse",
  },
];
const MyOrders = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const { orders, mutateOrders } = useOrders();
  const [userAllOrders, setUserAllOrders] = useState<IOrder[] | undefined>(
    orders
  );

  const addNewOrderHandler = () => {
    router.push(`${router.pathname}/add-new-order`);
  };

  return (
    <>
      <PageHeaders content="My Orders" showCalender={true} />

      <div className="flex flex-col justify-between relative flex-1 h-full">
        {userAllOrders?.length ? (
          <>
            <Table orders={userAllOrders} tableHeaders={tableHeaders} />
            <AddButton onClick={addNewOrderHandler} />
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center w-full ">
            <div className="relative h-[221px] w-[322px] ">
              <Image
                src="/noorder.png"
                layout="fill"
                objectFit="cover"
                alt="happy"
              />
            </div>
            <div className=" w-[375px] h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] text-center ">
              Until now, there were no orders on your list; start adding them.
              <br />
              <Link href={`${router.pathname}/add-new-order`}>
                <span className="text-[#0057FF] font-[500]">Add Order Now</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
