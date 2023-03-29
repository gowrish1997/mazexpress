//==========================
//     written by: raunak
//==========================

import { User } from "@/models/user.model";
import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: (user: User | null) => {},
});

export default UserContext;
