import Head from "next/head";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LogInView from "@/components/auth/LogInView";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import SignUpView from "@/components/auth/SignUpView";
import useUser from "@/lib/hooks/useUser";

const Gate = () => {
  const [mode, setMode] = useState<number>(1);

  const { user, mutateUser, userIsLoading } = useUser();
  function toggleMode(i: number) {
    setMode(i);
  }

  
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
