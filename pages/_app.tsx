import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import "react-notifications/lib/notifications.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NotificationContainer } from "react-notifications";
import { appWithTranslation } from "next-i18next";
import { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import AuthCTX from "@/components/context/auth.ctx";
import { SWRConfig } from "swr";
import { createToast } from "@/lib/toasts";
import fetchServer, { FetchError } from "@/lib/fetchServer";
import fetchSelf from "@/lib/fetchSelf";
import useScript from "@/lib/hooks/useScript";

// import useGoogle from "@/lib/hooks/useGoogle";
// import { User } from "@/models/user.model";

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const { status: googleStatus } = useGoogle({});
  const jetpass = new AuthManager();
  const [jet, set_jet] = useState<AuthManager | null>(jetpass);
  const [active_user, set_active_user] = useState<IWhiteListedUser | null>(
    jetpass.getUser()
  );
  // const dev_tools_status = useScript({ src: "http://localhost:8097" });
  useEffect(() => {
    // check local storage
    // console.log(rank);
    // const user = JSON.parse(localStorage.getItem("active_user"));
    // if (user && !active_user) {
    //   set_active_user(user);
    //   fetchSelf("/api/auth/bind_data", {
    //     method: "POST",
    //     body: JSON.stringify({ is_admin: user.is_admin }),
    //   }).then((data) => {
    //     router.push("/");
    //   });
    // }
  }, [active_user]);

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
            fetcher: fetchServer,
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
  if (router.pathname.startsWith("/auth")) {
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
            fetcher: fetchServer,
            onError: (err: FetchError) => {
              createToast({
                type: "error",
                title: err.name,
                message: err.message,
                timeOut: 3000,
              });
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
          fetcher: fetchServer,
          onError: (err) => {
            createToast({
              type: "error",
              title: err.name,
              message: err.message,
              timeOut: 3000,
            });
          },
        }}
      >
        <Frame>
          <Component {...pageProps} />
          <NotificationContainer />
        </Frame>
      </SWRConfig>
    </AuthCTX.Provider>
  );
}

export default appWithTranslation(App);
