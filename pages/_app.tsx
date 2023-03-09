import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import "react-notifications/lib/notifications.css";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from "next-auth/react";
import { NotificationContainer } from "react-notifications";

import "reflect-metadata";
config.autoAddCss = false;

export default function App({
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
          onError: (err: FetchError) => {
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
      <SessionProvider session={session}>
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
      </SessionProvider>
    </SWRConfig>
  );
}
