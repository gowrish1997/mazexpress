//==========================
//     written by: raunak
//==========================

import type { AuthManager } from "@/controllers/auth-ctr";
import { createContext } from "react";

const AuthCTX = createContext({
  jet: null,
  setJet: (jet: AuthManager) => {},
});

export default AuthCTX;
