import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useGoogle from "@/lib/hooks/useGoogle";

const LogInWithMail = () => {
  const { t } = useTranslation("");
  const submitButtons: string[] = t("signUpView.form.SubmitButton", {
    returnObjects: true,
  });
  const { status: googleStatus } = useGoogle({});

  const router = useRouter();

  useEffect(() => {
    // console.log(googleStatus);
    if (googleStatus === "initialized") {
      let container = document.getElementById("g_signin");
      let conf: google.accounts.id.GsiButtonConfiguration = {
        type: "standard",
        theme: "filled_black",
        width: "250",
      };
      if (container) {
        google.accounts.id.renderButton(container, conf);
      }
    }
  }, [googleStatus]);

  return (
    <div className="w-full box-border space-y-[10px] text-[14px] font-[500] leading-[19px]">
      <div id="g_signin" className="h-[40px]"></div>
    </div>
  );
};

export default LogInWithMail;
