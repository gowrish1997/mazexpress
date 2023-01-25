import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Frame from "@/common/Frame";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/auth/gate")) {
    // no frame
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </SessionProvider>
  );
}
