import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson, { FetchError } from "@/lib/fetchServer";
import "react-notifications/lib/notifications.css";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NotificationContainer } from "react-notifications";

import { appWithTranslation } from "next-i18next";
import useGoogle from "@/lib/hooks/useGoogle";
import UserContext from "@/components/context/user.context";
import { User } from "@/models/user.model";
import useUser from "@/lib/hooks/useUser";

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { status: googleStatus } = useGoogle({});

  const { user: sessUser, mutateUser } = useUser();
  const [user, setUser] = useState<User | null>(null);

  console.log("called in app tsx");

  useEffect(() => {
    // check backend session
    // // Check if the user was redirected from Arabic to English
    // const redirected = document.cookie.includes("i18n_redirected=true");
    // if (redirected) {
    //   console.log("redirected")
    //     // Remove the cookie
    //     document.cookie = "i18n_redirected=;max-age=0";
    //     // Redirect to the English version of the website
    //     if (router.pathname.includes("admin")) {
    //       console.log("_appp admin")
    //         router.push(`/en`);
    //     } else {
    //       console.log('app usr')
    //         router.push(`/${router.locale}`);
    //     }
    // }
  }, []);

  if (router.pathname.startsWith("/auth/gate")) {
    // no frame
    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
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
          <Component {...pageProps} />
          <NotificationContainer />
        </SWRConfig>
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
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
        <Frame>
          <Component {...pageProps} />
          <NotificationContainer />
        </Frame>
      </SWRConfig>
    </UserContext.Provider>
  );
}

export default appWithTranslation(App);
