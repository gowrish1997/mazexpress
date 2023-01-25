import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// check user authentication
// if auth send to dash home
// else send to gate

const Home = () => {
  return <div>UserDashHome</div>;
};

export default Home;
