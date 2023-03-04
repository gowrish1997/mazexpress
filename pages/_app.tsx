import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from "next-auth/react";
import "reflect-metadata";
import { DataSource } from "typeorm";
import DSContext from "@/lib/adapter/DSContext";
import { MazDataSource } from "@/lib/adapter/data-source";
config.autoAddCss = false;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: // pageProps,
AppProps) {
  const router = useRouter();

  const [db, setDb] = useState<DataSource | null>(null);

  useEffect(() => {
    // init the db and set to context
    if (db === null) {
      MazDataSource.then((dataSource) => {
        console.log("set the db");
        setDb(dataSource);
      });
    }
    return () => {
      db?.destroy().then((res) => {
        console.log(res);
        return;
      });
    };
  }, []);

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
        <DSContext.Provider
          value={{
            db,
            setDb,
          }}
        >
          <Component {...pageProps} />
          <NotificationContainer />
        </DSContext.Provider>
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
      <DSContext.Provider
        value={{
          db,
          setDb,
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
      </DSContext.Provider>
    </SWRConfig>
  );
}
