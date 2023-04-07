//==========================
//     written by: raunak
//==========================

import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// export default withIronSessionApiRoute(logoutRoute, sessionOptions);

export default function logoutRoute(req: NextApiRequest, res: NextApiResponse<null>) {
  try {

    
    // axios
    //   .post(`http://localhost:5000/api/auth/logout`, {
    //     // withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log("from logout: ", response);
    //     const ser_res = new APIResponse<null>()
    //     ser_res.count = 0
    //     ser_res.msg = "success"
    //     ser_res.ok = true
    //     ser_res.data = null
    //     res.json(ser_res);
    //     // setUser(null);
    //   })
    //   .catch((err) => {
    //     if (err) throw err;
    //   });
  } catch (err) {
    if (err) console.error(err);
  } finally {
    // set_update_counter((prev) => prev + 1);
  }
  // req.session.destroy();
 
}
