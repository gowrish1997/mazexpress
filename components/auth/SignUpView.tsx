import React, { useState } from "react";
import Image from "next/image";
import LogInWithMail from "./LogInWithMail";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";
import SignUpContent from "./SignUpContent";

const SignUpComponent = (props: any) => {
  console.log(props);

  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  return (
    <div
      className={`w-[300px] sm:w-[65%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start  ${
        locale == "en" ? "md:-ml-[20%]" : "md:-mr-[20%]"
      } `}
    >
      <h1
        className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}
      >
        {t("signUpView.Title")}
      </h1>
      <div className="w-full md:hidden flex flex-row justify-center items-baseline gap-x-[10px] ">
        <div className="h-[60px] w-[60px] relative">
          <Image src={logo} fill alt="logo" />
        </div>
        <h1
          className={` text-[26px] text-[#35C6F4] font-[900] leading-[36px]  `}
        >
          EXPRESS
        </h1>
      </div>
      <h1
        className={`md:hidden text-center text-[20px] text-[#000000] font-[600] leading-[36px] `}
      >
        {t("signUpView.MobileViewTitle")}
      </h1>
      <SignUpContent switch={props.switch} type="signUp" />
      <LogInWithMail />
    </div>
  );
};

export default SignUpComponent;
