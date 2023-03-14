import React, { useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import Script from "next/script";
import { useRouter } from "next/router";
import jwt from 'jsonwebtoken'

const LogInWithMail = () => {
  const { t } = useTranslation("");
  const submitButtons: string[] = t("signUpView.form.SubmitButton", {
    returnObjects: true,
  });

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
  useEffect(() => {
    // console.log("running side effect in google sign in.");
    // console.log(process.env.NEXT_PUBLIC_GOOGLE_ID);
    let container = document.getElementById("g_signin");
    // console.log(container);
    // window.google.accounts.id.initialize({
    //   client_id: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
    //   callback: handleCredentialResponse,
      
    // });
    let conf: google.accounts.id.GsiButtonConfiguration = {
      type: "standard",
      // click_listener: gsiHandler,
      theme: 'filled_black',
      width: '250',
    };
    window.google.accounts.id.renderButton(container, conf);
  }, [router.pathname]);

  return (
    <div className="w-full box-border space-y-[10px] text-[14px] font-[500] leading-[19px]">
      <div id="g_signin" className="h-[40px]"></div>
      {/* <div
        id="g_id_onload"
        // data-client_id="842151845247-la626nqpcc84pgaamb74a4n11qah43fh.apps.googleusercontent.com"
        data-client_id={process.env.GOOGLE_ID}
        data-context="signin"
        data-ux_mode="popup"
        // data-callback="handleTokenResponse"
        data-login_uri="http://localhost:3000/api/auth/callback/google"
        data-nonce=""
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        // data-shape="pill"
        data-theme="filled_black"
        data-text="signin_with"
        data-size="large"
        data-width="250"
        data-logo_alignment="right"
      ></div> */}
    </div>
  );
};

export default LogInWithMail;
