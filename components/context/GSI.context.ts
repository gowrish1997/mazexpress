//==========================
//     written by: raunak
//==========================

import { createContext } from "react";

const GSIContext = createContext({
  gsi: false,
  setGsi: (gsi: boolean) => {},
});

export default GSIContext;
