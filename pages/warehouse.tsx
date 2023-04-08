import React, { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import useWarehouses from "@/lib/hooks/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoadingPage from "@/components/common/LoadingPage";
import { GetServerSidePropsContext } from "next";

const WarehousePage = () => {
  const { warehouses, mutateWarehouses, warehousesIsLoading } = useWarehouses();

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
    <>
      <PageHeader
        content={t("warehousePage.pageHeader.Title")}
        title="Our Warehouses | MazExpress"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.map((data) => {
          return <WarehouseCard key={data.id} address={data} />;
        })}
      </div>
    </>
  );
};
export default WarehousePage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // await fetchJson("/api/warehouses")
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
