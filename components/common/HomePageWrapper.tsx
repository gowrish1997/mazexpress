//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import LanguageSwitcher from "@/components/LandingPage/LanguageSwitcher";
import AuthIcon from "@/public/auth_icon.png";
import New_logo from "@/public/new_logo_blue.png";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../LandingPage/Footer";
import MazCommunityForm from "../LandingPage/MazCommunityForm";
import LogoutConfirmModal from "./LogoutConfirmModal";

interface IProp {
  type: string;
  activeSection?: string;
  render: (
    shipmentCalculatorSectionRef?: React.MutableRefObject<HTMLDivElement>,
    enquirySectionRef?: React.MutableRefObject<HTMLDivElement>,
    supportSectionRef?: React.MutableRefObject<HTMLDivElement>
  ) => ReactNode;
}

const HomePageWrapper = (props: IProp) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;
  const { data: session, update }: { data: any; update: any } = useSession();

  var section: string[] = t("landingPage.navBar.Section", {
    returnObjects: true,
  });
  var auth: string[] = t("landingPage.navBar.Auth", { returnObjects: true });

  const shipmentCalculatorSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);
  const enquirySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${router.locale};path=/`;
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

  return (
    <>
      <div className="w-full">
        <div className="box-border w-full flex justify-center items-center h-[46px] bg-[#2B2B2B] text-[10px] md:text-[14px] text-[#FFFFFF] font-[500] leading-[12px] sm:leading-[15px] p-[15px] ">
          {t("landingPage.Header")}
        </div>

        {/* {props.type == "home"
          ? props.render(
              shipmentCalculatorSectionRef,
              enquirySectionRef,
              supportSectionRef
            )
          : props.render()} */}
        {props.render(
          shipmentCalculatorSectionRef,
          enquirySectionRef,
          supportSectionRef
        )}
        {!(router.pathname == "/TermsAndCondition") && (
          <>
            <div id="enquirySection">
              <MazCommunityForm ref={enquirySectionRef} />
            </div>
            <div className="w-full" id="supportSection">
              <Footer ref={supportSectionRef} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePageWrapper;
