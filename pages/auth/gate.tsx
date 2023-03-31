import Head from "next/head";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LogInView from "@/components/auth/LogInView";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import SignUpView from "@/components/auth/SignUpView";
import useUser from "@/lib/hooks/useUser";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MagicLinkView from "@/components/auth/MagicLinkView";

const Gate = () => {
    
  const [mode, setMode] = useState<number>(1);
  const router = useRouter();

  function toggleMode(i: number) {
    setMode(i);
  }

  useEffect(() => {
    if (router.query.mode) {
      setMode(parseInt(router.query.mode as string));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>
      <AuthLayout>
        {mode === 0 && <SignUpView switch={toggleMode} />}
        {mode === 1 && <LogInView switch={toggleMode} />}
        {mode === 2 && <MagicLinkView switch={toggleMode} />}
      </AuthLayout>
    </div>
  );
};

export default Gate;

export async function getStaticProps({ locale }: { locale: any }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
