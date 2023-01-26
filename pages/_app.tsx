import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Frame from "@/common/Frame";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith("/auth/gate")) {
    // no frame
    return <Component {...pageProps} />;
  }
  return (
    <Frame>
      <Component {...pageProps} />
    </Frame>
  );
}
