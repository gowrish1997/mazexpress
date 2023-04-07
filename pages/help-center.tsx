import PageHeader from "@/components/common/PageHeader";
import React, { useEffect } from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import HelpCenterView from "@/components/admin/help-center/modal/HelpCenterView";
import LoadingPage from "@/components/common/LoadingPage";
import useHelpCenter from "@/lib/hooks/useHelpCenter";
import { IHelpCenter } from "@/lib/hooks/useHelpCenter";
import { GetServerSidePropsContext } from "next";

const HelpCenter = () => {
    const router = useRouter();

    const { locales, locale: activeLocale } = router;

    const { t } = useTranslation("common");
    const { locale } = router;

    const { helpCenters } = useHelpCenter();
    console.log(helpCenters);

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    return (
        <div>
            {helpCenters?.data.length > 0 && (
                <HelpCenterView data={helpCenters?.data} />
            )}
        </div>
    );
};

export default HelpCenter;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
      await i18n?.reloadResources();
    }
    // console.log("redders", ctx.req.cookies);
    if (ctx.req.cookies.is_admin !== "true") {
      return {
        redirect: {
          destination: "/",
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
