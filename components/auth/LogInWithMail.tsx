import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import useGoogle from "@/lib/hooks/useGoogle";

const LogInWithMail = () => {
  // const { t } = useTranslation("");
  // const submitButtons: string[] = t("signUpView.form.SubmitButton", {
  //   returnObjects: true,
  // });

  // const { status: googleStatus, resolver } = useGoogle({});

  // useEffect(() => {
  //   if (googleStatus === "initialized") {
  //     resolver();
  //   }
  // }, [googleStatus]);

  return (
    <div className="w-full box-border space-y-[10px] text-[14px] font-[500] leading-[19px]">
      <div id="g_signin" className="h-[40px]"></div>
    </div>
  );
};

export default LogInWithMail;
