import PageHeader from "@/components/common/PageHeader";
import React, { useEffect } from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


const HelpCenter = () => {
    const router = useRouter();

    const { locales, locale: activeLocale } = router;

    const { t } = useTranslation("common");
    const { locale } = router;

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    // useEffect(() => {
    //     console.log("use efft");
    //     router.push(router.asPath, router.asPath, { locale: "en" });
    // }, []);
    return (
        <>
            <PageHeader
                content="Help Center"
                title="Help Center | MazExpress"
            />
            <div className="py-10">
                <h1>Coming soon...</h1>
            </div>
        </>
    );
};

export default HelpCenter;
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
