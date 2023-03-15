import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson, { FetchError } from "@/lib/fetchServer";
import "react-notifications/lib/notifications.css";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NotificationContainer } from "react-notifications";
import "reflect-metadata";
import jwt, { JwtPayload } from "jsonwebtoken";
import fetchSelf from "@/lib/fetchSelf";

import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import GSIContext from "@/components/context/GSI.context";

config.autoAddCss = false;

function App({
  Component,
  // pageProps: { session, ...pageProps },
  pageProps,
}: AppProps) {
  const router = useRouter();
  const [gsi, setGsi] = useState(false);

  const loadedGSIHandler = () => {
    console.log("loaded gsi");
    setGsi(true);
  };

  async function handleCredentialResponse(
    response: google.accounts.id.CredentialResponse
  ) {
    // console.log(response.credential)
    const payload = jwt.decode(response.credential, {
      json: true,
    });
    if (payload) {
      // console.log(typeof payload);
      fetchSelf(`/api/auth/callback/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload }),
      })
        .then((response) => {
          // console.log("response at cred handler", response);
          if (response.ok) {
            createToast({
              type: "success",
              message: "you are now logged in",
              title: "login success",
              timeOut: 1000,
            });
            setTimeout(() => {
              if (response.user.is_admin === true) {
                router.push("/admin");
              } else {
                router.push("/");
              }
            }, 1000);
          }
        })
        .catch((err) => {
          if (err) throw err;
          console.log("cred err", err);
          createToast({
            type: "error",
            message: "some error",
            title: "login failed",
            timeOut: 1000,
          });
        });
      // console.log("cred result", credResult);
    } else {
      // console.log(payload);
      createToast({
        type: "error",
        message: "invalid credentials",
        title: "login failed",
        timeOut: 1000,
      });
    }
  }

  useEffect(() => {
    
    if (gsi) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
        callback: handleCredentialResponse,
      });
      // notify components
    }
  }, [gsi]);

  if (router.pathname.startsWith("/auth/gate")) {
    // no frame
    return (
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err: FetchError) => {
            createToast({
              type: "error",
              title: err.name,
              message: err.message,
              timeOut: 3000,
            });
            // console.error(err);
          },
        }}
      >
        <GSIContext.Provider
          value={{
            gsi: gsi,
            setGsi: setGsi,
          }}
        >
          <Script
            src="https://accounts.google.com/gsi/client"
            onLoad={loadedGSIHandler}
            // strategy={'beforeInteractive'}
          />
          <Component {...pageProps} />
          <NotificationContainer />
        </GSIContext.Provider>
      </SWRConfig>
    );
  }
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          createToast({
            type: "error",
            title: err.name,
            message: err.message,
            timeOut: 3000,
          });
          // console.error(err);
        },
      }}
    >
      <GSIContext.Provider
        value={{
          gsi: gsi,
          setGsi: setGsi,
        }}
      >
        <Frame>
          <Script
            src="https://accounts.google.com/gsi/client"
            onLoad={loadedGSIHandler}
            // strategy={'beforeInteractive'}
          />
          <Component {...pageProps} />
          <NotificationContainer />
        </Frame>
      </GSIContext.Provider>
    </SWRConfig>
  );
}

export default appWithTranslation(App);
