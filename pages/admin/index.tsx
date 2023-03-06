import PageHeader from "@/components/common/PageHeader";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TotalOrders from "@/components/admin/MazStats/TotalOrders";
import TotalCustomer from "@/components/admin/MazStats/TotalCustomer";
import WarehouseOrders from "@/components/admin/MazStats/WarehouseOrders";
TotalCustomer;
import StatGraph from "@/components/admin/MazStats/StatGraph";
import OrdersTotalCountBar from "@/components/admin/MazStats/OrdersTotalCountBar";
import StatLiveOrdres from "@/components/admin/MazStats/StatLiveOrdres";
import RecentCustomers from "@/components/admin/MazStats/RecentCustomers";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const AdminHome = () => {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;

    useEffect(() => {
        console.log("use efft");
        router.push(router.asPath, router.asPath, { locale: "en" });
    }, []);

    return (
        <div className="space-y-[15px]">
            <p className="text-[16px] text-[#18181B] font-[700] leading-[24px]">
                Hey Muhammad Ali -<span className="text-[16px] text-[#71717A] font-[400] leading-[26px] ">here’s what’s happening at your warehouse</span>
            </p>
            <div className="flex-type3 gap-x-[10px]">
                <TotalOrders />
                <TotalCustomer />
                <WarehouseOrders />
            </div>
            <div className="flex-type3 gap-x-[10px] h-[300px] relative z-10">
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
