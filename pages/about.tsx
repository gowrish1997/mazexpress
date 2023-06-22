//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import { useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Aboutpage from "@/components/LandingPage/AboutPage";

import HomePageWrapper from "@/components/common/HomePageWrapper";
import Head from "next/head";

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
      <Head>
        <title>About Us</title>
      </Head>
      <div className="w-full">
        <HomePageWrapper
          type="about"
          render={(
            shipmentCalculatorSectionRef: React.MutableRefObject<HTMLDivElement>,
            enquirySectionRef: React.MutableRefObject<HTMLDivElement>,
            supportSectionRef: React.MutableRefObject<HTMLDivElement>
          ) => {
            return (
              <Aboutpage
                ref={AboutSectionRef}
                calRef={shipmentCalculatorSectionRef}
                enquiryRef={enquirySectionRef}
                supportRef={supportSectionRef}
              />
            );
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
