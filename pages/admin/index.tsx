import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import TotalOrders from "@/components/admin/MazStats/TotalOrders";
import TotalCustomer from "@/components/admin/MazStats/TotalCustomer";
import WarehouseOrders from "@/components/admin/MazStats/WarehouseOrders";
import StatGraph from "@/components/admin/MazStats/StatGraph";
import OrdersTotalCountBar from "@/components/admin/MazStats/OrdersTotalCountBar";
import StatLiveOrdres from "@/components/admin/MazStats/StatLiveOrdres";
import RecentCustomers from "@/components/admin/MazStats/RecentCustomers";

import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthCTX from "@/components/context/auth.ctx";
import { IWhiteListedUser } from "@/controllers/auth-ctr";
import { GetServerSidePropsContext } from "next";
import useAuthorization from "@/lib/hooks/useAuthorization";
const AdminHome = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { status: rank, is_loading: rank_is_loading } = useAuthorization();
  // console.log(activeLocale);
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  useEffect(() => {
    // console.log("use efft");
    console.log(rank)
    router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

  if (rank_is_loading) {
    return <div>content authorization in progress..</div>;
  }

  if (!rank_is_loading && rank !== "true") {
    return <div>401 - Unauthorized</div>;
  }

  return (
    <div className="space-y-[15px]">
      <p className="text-[16px] text-[#18181B] font-[700] leading-[24px]">
        Hey {user?.first_name} {user?.last_name} -
        <span className="text-[16px] text-[#71717A] font-[400] leading-[26px] ">
          here’s what’s happening at your warehouse
        </span>
      </p>
      <div className="flex-type3 gap-x-[10px] z-20 ">
        <TotalOrders />
        <TotalCustomer />
        <WarehouseOrders />
      </div>
      <div className="flex-type3 gap-x-[10px] h-[300px] relative ">
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
// export async function getStaticProps({ locale }: { locale: any }) {
//   if (process.env.NODE_ENV === "development") {
//     await i18n?.reloadResources();
//   }
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // console.log("redders", ctx.req.cookies);
  // if (ctx.req.cookies.is_admin !== "true") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}
