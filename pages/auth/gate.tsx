import LogInComponent from "@/components/auth/LogInComponent";
import SignUpComponent from "@/components/auth/SignUpComponent";
import React, { useState } from "react";

const Gate = () => {
  const [newUser, setNewUser] = useState<boolean>(true);

  return (
    <div>
      {/* <button>Login</button>
      <button>Register</button> */}
      {newUser ? <SignUpComponent /> : <LogInComponent />}
    </div>
  );
};

export default Gate;
