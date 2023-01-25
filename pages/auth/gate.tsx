import LogInComponent from "@/components/auth/LogInComponent";
import SignUpComponent from "@/components/auth/SignUpComponent";
import Head from "next/head";
import React, { useState } from "react";

const Gate = () => {
  const [newUser, setNewUser] = useState<boolean>(true);

  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>
      {/* <button>Login</button>
      <button>Register</button> */}
      {newUser ? <SignUpComponent /> : <LogInComponent />}
    </div>
  );
};

export default Gate;
