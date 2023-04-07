//==========================
//     written by: raunak
//==========================

import type { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import { createContext } from "react";

const AuthCTX = createContext({
  active_user: null,
  set_active_user: (user: IWhiteListedUser) => {},
  jet: null,
  set_jet: (jet: AuthManager) => {},
});

export default AuthCTX;
