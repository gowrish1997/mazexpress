import LogInView from "@/components/auth/LogInView";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import SignUpView from "@/components/auth/SignUpView";
import Head from "next/head";
import React, { useState } from "react";

const Gate = () => {
  const [mode, setMode] = useState<number>(0);
  function toggleMode(i: number) {
    setMode(i);
  }

  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>

      {mode === 0 && <SignUpView switch={toggleMode} />}
      {mode === 1 && <LogInView switch={toggleMode} />}
      {mode === 2 && <ResetPasswordView switch={toggleMode} />}
    </div>
  );
};

export default Gate;
