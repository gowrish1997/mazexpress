import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PageHeaders from "@/components/orders/PageHeader";
import Table from "@/components/orders/table";
import AddButton from "@/common/AddButton";
import useUser from "@/lib/useUser";
import useOrders from "@/lib/useOrders";

const tableHeaders = [
  "MAZ Tracking ID",
  "Store",
  "Reference ID",
  "Estimated Delivery",
  "Address",
  "Status",
];

const MyOrders = () => {
  console.log("my orderpage");

  const router = useRouter();
  const { user, mutateUser } = useUser();
  const { orders, mutateOrders, ordersIsLoading } = useOrders({
    userId: user?.id_users,
  });
  // const [userAllOrders, setUserAllOrders] = useState<IOrderResponse[] | undefined>(data
  // );

  // console.log(orders);

  const addNewOrderHandler = () => {
    router.push(`${router.pathname}/add-new-order`);
  };

  return (
    <>
      <PageHeaders
        content="My Orders"
        showCalender={true}
        title="My Orders | MazExpress"
      />

      <div className="flex flex-col justify-between relative flex-1 h-full">
        {ordersIsLoading ||
          (orders && orders.length <= 0 && (
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
                Oops, there are no orders on your list yet... Start adding now.
                <br />
                <Link href={`${router.pathname}/add-new-order`}>
                  <span className="text-[#0057FF] font-[500]">
                    Add Order Now
                  </span>
                </Link>
              </div>
            </div>
          ))}
        {orders && orders.length > 0 && (
          <>
            <Table orders={orders} tableHeaders={tableHeaders} />
            <AddButton onClick={addNewOrderHandler} />
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;
