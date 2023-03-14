import React, { useEffect, useState } from "react";
import Image from "next/image";
import PageHeader from "@/components/common/PageHeader";
import Layout from "@/components/layout";
import PackageTrackingView from "@/components/ordertracking/PackageTrackingView";
import WarehouseTracking from "@/components/ordertracking/WarehouseTracking";
import useOrders from "@/lib/hooks/useOrders";
import useUser from "@/lib/hooks/useUser";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import TrackingPageView from "@/components/ordertracking/TrackingPageView";
import { useRouter } from "next/router";
import useTracking from "@/lib/hooks/useTracking";
import Link from "next/link";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Tracking } from "@/models/tracking.model";
import { Order } from "@/models/order.model";

const TrackOrder = (props: any) => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const { orders, ordersIsLoading } = useOrders({
    user_id: user?.id as string,
  });

  const { tracking, mutateTracking, trackingIsLoading } = useTracking({
    maz_id: router.query.id as string,
  });
  const { t } = useTranslation("common");
  const { locale } = router;

  useEffect(() => {
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

  const [packageStatus, setPackageStatus] = useState(0);

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined) {
      let sorted = [...(tracking as Tracking[])];
      sorted.sort((a: any, b: any) => a?.stage - b?.stage);
      setPackageStatus(sorted.pop()?.stage!);
    }
  }, [tracking]);

  if (trackingIsLoading) return <div>loading tracking</div>;
  return (
    <>
      <PageHeader
        content={t("trackingView.pageHeader.Title")}
        className="border-none pb-[10px]"
        title="Track order | MazExpress"
      />
      <Layout>
        <div className="flex-type2 w-full ">
          <div className="flex-type6 w-3/4 pr-[20px] gap-y-[35px] ">
            <div className="flex-type1 gap-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px]">
              <Image
                src="/blueexclamatory.png"
                alt="icon"
                width={16}
                height={16}
              />
              <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                {t("trackingView.LinkPPart1")}{" "}
                <span className="text-[#3672DF]">
                  {t("trackingView.LinkPPart2")}
                </span>
              </p>
            </div>

            <TrackingPageView packageStatus={packageStatus} />
          </div>
          <div
            className={`w-1/4 h-full ${
              locale == "en"
                ? "pl-[20px] border-l-[0.4px] border-l-[#BBC2CF]"
                : "pr-[20px] border-r-[0.4px] border-r-[#BBC2CF]"
            }  space-y-[5px] `}
          >
            <div className="text-[#2B2B2B] text-[14px] leading-[21px] font-[500] border-b-[1px] border-b-[#BBC2CF] pb-[20px] ">
              {t("trackingView.listOfTrackingId.Title")}
            </div>
            <div className="space-y-[10px]">
              {(orders as Order[])?.map((data) => {
                return (
                  <Link href={`/track/${data.id}`} key={data.id}>
                    <p className="text-[#525D72] text-[14px] font-[500] leading-[21px] px-[5px] py-[15px] cursor-pointer hover:text-[#2B2B2B] hover:bg-[#EDF5F9] rounded-[4px] ">
                      {data.id}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TrackOrder;
export async function getStaticProps({ locale }: { locale: any }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
