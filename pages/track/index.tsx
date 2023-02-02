import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageHeader from "@/components/orders/PageHeader";
import Layout from "@/components/layout";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import PackageTrackingView from "@/components/ordertracking/PackageTrackingView";
import WarehouseTracking from "@/components/ordertracking/WarehouseTracking";
import useOrders from "@/lib/useOrders";
import useUser from "@/lib/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";

const TrackOrder = (props: any) => {
  const router = useRouter();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, mutateUser, userIsLoading } = useUser();
  const { orders, ordersIsLoading } = useOrders({ userId: user?.id_users });

  const [packageStatus, setPackageStatus] = useState(0);

  const trackHandler = () => {
    if (
      searchInputRef.current !== null &&
      searchInputRef.current !== undefined
    ) {
      const id = searchInputRef.current.value;
      if (id !== "") {
        router.push(`/track/${id}`);
      } else {
        createToast({
          type: "warning",
          title: "Track failed",
          message: "Enter a valid Maz tracking id",
          timeOut: 3000,
        });
      }
    }
  };

  return (
    <>
      <PageHeader
        content="Order Tracking"
        className="border-none pb-[10px]"
        title="Track your package | MazExpress"
      />
      <Layout>
        <div className="flex-type2 w-full">
          <div className="flex flex-col gap-y-[35px] w-full">
            <div className="font-[500]">
              <p className="text-[14px] text-[#2B2B2B] leading-[21px]">
                Tracking
              </p>
              <p className="text-[12px] text-[#8794AD] leading-[17px]">
                Enter the Maz tracking id to find your package!
              </p>
            </div>
            <div className="flex-1 min-h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] flex pl-[15px] relative">
              <input
                className="bg-transparent focus:outline-none searchbar flex-1"
                id="searchbar"
                type="text"
                placeholder="Search with MAZ ID"
                ref={searchInputRef}
              />
              <div
                className="absolute w-[16px] h-[16px] right-[10px] top-[15px] cursor-pointer"
                onClick={trackHandler}
              >
                <Image
                  src="/search.png"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="search"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TrackOrder;
