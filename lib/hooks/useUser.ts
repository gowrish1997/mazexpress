import { useContext } from "react";
import AuthCTX from "@/components/context/auth.ctx";
import { AuthManager } from "@/controllers/auth-ctr";
// use the current user profile from sessions
/**
 *
 * @returns IWhiteListedUser
 */
export default function useUser() {
  const jet: AuthManager = useContext(AuthCTX)["jet"];
  return {
    user: jet.getUser(),
  };
}
//==========================
//     written by: raunak
//==========================
