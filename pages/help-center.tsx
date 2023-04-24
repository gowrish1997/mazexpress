import HelpCenterView from "@/components/admin/help-center/modal/HelpCenterView";
import useHelpCenter from "@/lib/hooks/useHelpCenter";
import { GetServerSidePropsContext } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserPageWrapper from "@/components/common/UserPageWrapper";

const HelpCenter = () => {
    const router = useRouter();

    const { locales, locale: activeLocale } = router;

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
        <UserPageWrapper>
            <div>
                {helpCenters?.data?.length > 0 && (
                    <HelpCenterView data={helpCenters?.data} />
                )}
            </div>
        </UserPageWrapper>
    );
};

export default HelpCenter;
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
