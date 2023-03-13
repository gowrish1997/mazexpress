import Head from "next/head";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LogInView from "@/components/auth/LogInView";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import SignUpView from "@/components/auth/SignUpView";
import { useRouter } from "next/router";

const Gate = () => {
  const router = useRouter()
  const [mode, setMode] = useState<number>(1);

  function toggleMode(i: number) {
    setMode(i);
  }

  useEffect(() => {
    // set proper mode

    // console.log(router.query)
    if (router.query.mode) {
      setMode(parseInt(router.query.mode as string))
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>
      <AuthLayout>
        {mode === 0 && <SignUpView switch={toggleMode} />}
        {mode === 1 && <LogInView switch={toggleMode} />}
        {mode === 2 && <ResetPasswordView switch={toggleMode} />}
      </AuthLayout>
    </div>
  );
};

export default Gate;
