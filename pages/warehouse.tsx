import LoadingPage from "@/components/common/LoadingPage";
import PageHeader from "@/components/common/PageHeader";
import WarehouseCard from "@/components/warehouse/WarehouseCard";
import useWarehouses from "@/lib/hooks/useWarehouses";
import { GetServerSidePropsContext } from "next";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserPageWrapper from "@/components/common/UserPageWrapper";

const WarehousePage = () => {
    const { warehouses, mutateWarehouses, warehousesIsLoading } =
        useWarehouses();

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    if (warehousesIsLoading) {
        return <LoadingPage />;
    }

    return (
        <UserPageWrapper>
            <PageHeader
                content={t("warehousePage.pageHeader.Title")}
                title="Our Warehouses | MazExpress"
            />
            <div className="grid grid-cols-3 gap-3 py-5">
                {warehouses?.map((data) => {
                    return <WarehouseCard key={data.id} address={data} />;
                })}
            </div>
        </UserPageWrapper>
    );
};
export default WarehousePage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
