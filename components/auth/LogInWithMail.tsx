import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import Script from "next/script";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import GSIContext from "../context/GSI.context";
import useGoogle from "@/lib/hooks/useGoogle";

const LogInWithMail = () => {
  const { t } = useTranslation("");
  const submitButtons: string[] = t("signUpView.form.SubmitButton", {
    returnObjects: true,
  });
  const { status: googleStatus } = useGoogle({});

  const gsiHandler = () => {};

  function handleCredentialResponse(
    response: google.accounts.id.CredentialResponse
  ) {
    // console.log(response.credential)
    const payload = jwt.decode(response.credential, {
      json: true,
    });
    if (payload) {
      console.log(payload);
    } else {
      console.log(payload);
    }
  }

  const router = useRouter();

  const gsi = useContext(GSIContext)["gsi"];

  useEffect(() => {
    console.log(googleStatus);
    if (googleStatus === "initialized") {
      let container = document.getElementById("g_signin");
      let conf: google.accounts.id.GsiButtonConfiguration = {
        type: "standard",
        // click_listener: gsiHandler,
        theme: "filled_black",
        width: "250",
      };
      if (container) {
        google.accounts.id.renderButton(container, conf);
      }
    }
    // window.onload = () => {
    //   console.log("working")
    // }
    // if (!window.google) {
    //   console.log("google not initialized");
    // }
    // window.google.accounts.id.renderButton(container, conf);
  }, [googleStatus]);

  return (
    <div className="w-full box-border space-y-[10px] text-[14px] font-[500] leading-[19px]">
      <div id="g_signin" className="h-[40px]"></div>
    </div>
  );
};

export default LogInWithMail;
