import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Frame from "@/components/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { createToast } from "@/lib/toasts";
import { config } from "@fortawesome/fontawesome-svg-core";
import { appWithTranslation } from "next-i18next";

config.autoAddCss = false;

function App({
    Component,
    // pageProps: { session, ...pageProps },
    pageProps,
}: AppProps) {
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
                        // console.error(err);
                    },
                }}
            >
                <Component {...pageProps} />

                {/* <NotificationContainer /> */}
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
            <Frame>
                <Component {...pageProps} />
                {/* <NotificationContainer /> */}
            </Frame>
        </SWRConfig>
    );
}
export default appWithTranslation(App);
