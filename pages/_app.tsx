import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Frame from "@/common/Frame";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchJson";

export default function App({
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
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    );
  }
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </SWRConfig>
  );
}
