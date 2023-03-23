//==========================
//     written by: raunak
//==========================

import fetchServer from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let responseObj = new APIResponse<Partial<User>>();
    console.log("/api/user called: ", req.session.user);
    try {
      if (req.session.user) {
        // console.log('session user', req.session.user);
        // check for updates with a preflight call and then update user
        let preflight: boolean = false;

        // if(!process.env.NODE_ENV === "production"){
        //   preflight = await fetchServer(`/api/users/preflight`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ user: req.session.user }),
        //   });
        // }
        preflight = await fetchServer(`/api/users/preflight`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: req.session.user }),
        });
        console.log("preflight", preflight);
        if (!preflight && req.session.user) {
          // update user if preflight is false => users are not same
          const user: APIResponse<Partial<User>> = await fetchServer(
            `/api/users/${req.session.user.email}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("update user", user.data)
          if (user.ok && user?.data?.[0]) {
            req.session.user = user.data[0] as Partial<User>;
            await req.session.save();
            responseObj.ok = true;
            responseObj.count = 1;
            responseObj.data = [req.session.user];
            responseObj.msg = "user was updated";
            return res.status(200).json(responseObj);
          }
        }

        // return session user
        responseObj.ok = true;
        responseObj.count = 1;
        responseObj.data = [req.session.user];
        responseObj.msg = "no updates to user";
        return res.status(200).json(responseObj);
      } else {
        // no user in session
        responseObj.ok = true;
        responseObj.count = 0;
        responseObj.data = null;
        responseObj.msg = "no user";
        return res.status(200).json(responseObj);
      }
    } catch (err) {
      console.error(err);
      responseObj.ok = false;
      responseObj.count = 0;
      responseObj.data = null;
      responseObj.msg = (err as Error).message;
      return res.status(500).json(responseObj);
    }
  }
}
