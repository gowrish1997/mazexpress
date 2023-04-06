//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import React, { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Aboutpage from "@/components/LandingPage/AboutPage";

import HomePageWrapper from "@/components/common/HomePageWrapper";

const About = () => {
    const router = useRouter();

    const AboutSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.cookie = `NEXT_LOCALE=${router.locale};path=/`;
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    //   console.log(user);

    return (
        <>
            <div className="w-full">
                <HomePageWrapper
                    type="about"
                    render={() => {
                        return <Aboutpage ref={AboutSectionRef} />;
                    }}
                ></HomePageWrapper>
            </div>
        </>
    );
};

export default About;

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
