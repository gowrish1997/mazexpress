import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchServer";
import "react-notifications/lib/notifications.css";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { appWithTranslation } from "next-i18next";
import { NotificationContainer } from "react-notifications";

import "reflect-metadata";
config.autoAddCss = false;

 function App({
  Component,
  pageProps: { session, ...pageProps },
}: // pageProps,
AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/auth/gate")) {
    // no frame
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
            console.error(err);
          },
        }}
      >
        <Component {...pageProps} />
        <NotificationContainer />
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
          console.error(err);
        },
      }}
    >
      <Frame>
        {/* <Script
            src="https://accounts.google.com/gsi/client"
            // strategy="beforeInteractive"
            // onLoad={() => console.log('loaded')}
            // onError={(err) => console.log(err)}
          /> */}
        <Component {...pageProps} />
        <NotificationContainer />
      </Frame>
    </SWRConfig>
  );
}
export default appWithTranslation(App);
