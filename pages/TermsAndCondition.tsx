import React from "react";
import HomePageWrapper from "@/components/common/HomePageWrapper";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "@/components/LandingPage/Footer";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const TermsAndCondition = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const content: string[] = t("termsAndCondition.Content", {
        returnObjects: true,
    });
    return (
        <div className="w-full h-full flex flex-col justify-between ">
            <HomePageWrapper
                type="service"
                render={() => {
                    return (
                        <div className="w-[100%] flex justify-center items-center mt-[40px]  ">
                            <ul className="w-[70%]">
                                {content.map((data, index) => {
                                    return (
                                        <li key={index} className="list-disc ">
                                            {data}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                }}
            ></HomePageWrapper>
            <Footer />
        </div>
    );
};

export default TermsAndCondition;
export async function getStaticProps({ locale }: { locale: any }) {
    // console.log(process.env);
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
