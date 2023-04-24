import OrdersTotalCountBar from "@/components/admin/MazStats/OrdersTotalCountBar";
import RecentCustomers from "@/components/admin/MazStats/RecentCustomers";
import StatGraph from "@/components/admin/MazStats/StatGraph";
import StatLiveOrdres from "@/components/admin/MazStats/StatLiveOrdres";
import TotalCustomer from "@/components/admin/MazStats/TotalCustomer";
import TotalOrders from "@/components/admin/MazStats/TotalOrders";
import WarehouseOrders from "@/components/admin/MazStats/WarehouseOrders";
import { getSession } from "@/lib/selectOrder";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import AdminPageWrapper from "@/components/common/AdminPageWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
const AdminHome = () => {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;
    const { data: session, update }: { data: any; update: any } = useSession();

    return (
        <AdminPageWrapper>
            <div className="space-y-[15px]">
                <p className="text-[16px] text-[#18181B] font-[700] leading-[24px]">
                    Hey {session?.user?.first_name} {session?.user?.last_name} -
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
        </AdminPageWrapper>
    );
};

export default AdminHome;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    const session = await getServerSession<any>(ctx.req, ctx.res, authOptions);
    // const { pathname } = ctx.req.url;
    console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: `/auth/gate?mode=1`,
                permanent: false,
            },
        };
    }

    if (ctx.locale == "ar" && ((session as any)?.user as any).is_admin) {
        return {
            redirect: {
                destination: `${ctx.resolvedUrl}`,
                permanent: false,
            },
        };
    }
    if (!((session as any)?.user as any).is_admin) {
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            },
        };
    }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
