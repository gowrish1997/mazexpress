import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
// import { SWRConfig } from "swr";
// import fetchJson, { FetchError } from "@/lib/fetchServer";
import "react-notifications/lib/notifications.css";
// import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NotificationContainer } from "react-notifications";

import { appWithTranslation } from "next-i18next";
// import useGoogle from "@/lib/hooks/useGoogle";
// import UserContext from "@/components/context/user.context";
// import { User } from "@/models/user.model";
// import useUser from "@/lib/hooks/useUser";
import { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import AuthCTX from "@/components/context/auth.ctx";
import { SWRConfig } from "swr";
import { createToast } from "@/lib/toasts";
import { FetchError } from "@/lib/fetchServer";

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const { status: googleStatus } = useGoogle({});

  // call auth manager for authentication management
  // init
  // update with local storage object
  const jetpass = new AuthManager();

  // const { user: sessUser, mutateUser } = useUser();
  const [jet, set_jet] = useState<AuthManager | null>(jetpass);
  const [active_user, set_active_user] = useState<IWhiteListedUser | null>(
    jetpass.getUser()
  );

  useEffect(() => {
    // check backend session
    // if (sessUser) {
    //   setUser(sessUser);
    // }
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
  }, [active_user]);

  if (router.pathname.startsWith("/auth")) {
    // no frame
    return (
      // <UserContext.Provider
      //   value={{
      //     user,
      //     setUser,
      //   }}
      // >
      <AuthCTX.Provider
        value={{
          jet,
          set_jet,
          active_user,
          set_active_user,
        }}
      >
        {/* <SWRConfig
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
        > */}
        <Component {...pageProps} />
        <NotificationContainer />
        {/* </SWRConfig> */}
      </AuthCTX.Provider>
      // </UserContext.Provider>
    );
  }
  if (router.pathname.startsWith("/tstt")) {
    // no frame
    return (
      <AuthCTX.Provider
        value={{
          jet,
          set_jet,
          active_user,
          set_active_user,
        }}
      >
        <SWRConfig
          value={{
            // fetcher: fetchJson,
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
      </AuthCTX.Provider>
    );
  }
  return (
    // <UserContext.Provider
    //   value={{
    //     user,
    //     setUser,
    //   }}
    // >
    <AuthCTX.Provider
      value={{
        jet,
        set_jet,
        active_user,
        set_active_user,
      }}
    >
      <SWRConfig
        value={{
          // fetcher: fetchJson,
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
    </AuthCTX.Provider>
    // </UserContext.Provider>
  );
}

export default appWithTranslation(App);
