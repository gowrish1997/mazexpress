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
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";

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
    <UserPageWrapper>
      <PageHeader
        content={t("warehousePage.pageHeader.Title")}
        title="Our Warehouses | MazExpress"
      />
      <Layout>
        <div className="w-full flex flex-row justify-start items-start gap-x-[10px] gap-y-[10px] flex-wrap">
          {warehouses?.map((data) => {
            return <WarehouseCard key={data.id} address={data} />;
          })}
        </div>
      </Layout>
    </UserPageWrapper>
  );
};
export default WarehousePage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  const session = await getServerSession(
    ctx.req as any,
    ctx.res as any,
    authOptions as any
  );
  // const { pathname } = ctx.req.url;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/gate?mode=1`,
        permanent: false,
      },
    };
  }

  if (
    (ctx.locale == "en" ? "english" : "arabic") !=
    ((session as any)?.user as any).lang
  ) {
    return {
      redirect: {
        destination:
          ((session as any)?.user as any).lang === "english"
            ? `${ctx.resolvedUrl}`
            : `/ar${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }
  if (((session as any)?.user as any).is_admin) {
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
