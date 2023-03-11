import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/orders/table";
import AddButton from "@/components/common/AddButton";
import useUser from "@/lib/hooks/useUser";
import useOrders from "@/lib/hooks/useOrders";
import { Order } from "@/models/order.model";

const tableHeaders = [
  "MAZ Tracking ID",
  "Store Link",
  "Reference ID",
  "Est. Delivery",
  "Address",
  "Status",
];

const MyOrders = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    user_id: user?.id,
  });

  const addNewOrderHandler = () => {
    router.push(`/add-new-order`);
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  if (ordersError) throw ordersError;
  return (
    <>
      <PageHeader
        content="My Orders"
        showCalender={true}
        title="My Orders | MazExpress"
      />

      <div className="flex flex-col justify-between relative flex-1 h-full">
        {ordersIsLoading && <div>loading orders</div>}
        {orders && (orders as Order[]).length === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center w-full ">
            <div className="relative h-[221px] w-[322px] ">
              <Image
                src="/noorder.png"
                fill
                style={{ objectFit: "contain" }}
                alt="empty"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
                priority={true}
              />
            </div>
            <div className=" w-[375px] h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] text-center ">
              Oops, there are no orders on your list yet... Start adding now.
              <br />
              <Link href={`/add-new-order`}>
                <span className="text-[#0057FF] font-[500] p-[5px] rounded-[4px] hover:bg-[#EDF5F9] ">
                  Add Order Now
                </span>
              </Link>
            </div>
          </div>
        )}
        {orders && (orders as Order[]).length > 0 && (
          <>
            <Table rows={orders as Order[]} headings={tableHeaders} type="order" />
            <AddButton onClick={addNewOrderHandler} />
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;
