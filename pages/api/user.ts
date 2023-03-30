import { data } from "./../../components/admin/MazStats/StatGraph";
import UserContext from "@/components/context/user.context";
import { useContext } from "react";
import fetchServer from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const user = useContext(UserContext)["user"];
    // const { setUser } = useContext(UserContext);
    let responseObj = new APIResponse<User>();
    // console.log("/api/user called: ", user);
    res.json("ok");
    // context is much better...
    // try {

    //   if (user) {
    //     // console.log(user.updated_on);
    //     let preflight = await fetchServer(
    //       `/api/users/preflight/${user.email}?updated_on=${user.updated_on}`,
    //       {
    //         method: "OPTIONS",
    //         headers: {
    //           "Access-Control-Request-Method": "GET",
    //           "Access-Control-Request-Headers": "Content-Type",
    //         },
    //       }
    //     );
    //     // console.log("preflight", preflight);
    //     if (!preflight && user) {
    //       // update user if preflight is false => users are not same
    //       const updated_user: APIResponse<User> = await fetchServer(
    //         `/api/users/${user.email}`,
    //         {
    //           method: "GET",
    //           headers: { "Content-Type": "application/json" },
    //         }
    //       );
    //       // console.log("update user", updated_user.data);
    //       if (updated_user.ok && updated_user?.data?.[0]) {
    //         setUser(updated_user.data[0] as User);
    //         // req.session.user = updated_user.data[0] as Partial<User>;
    //         // await req.session.save();
    //         responseObj.ok = true;
    //         responseObj.count = 1;
    //         // responseObj.data = [req.session.user];
    //         responseObj.data = updated_user.data as User[];
    //         responseObj.msg = "user was updated";
    //         return res.status(200).json(responseObj);
    //       }
    //     }

    //     // return session user
    //     responseObj.ok = true;
    //     responseObj.count = 1;
    //     responseObj.data = [user];
    //     responseObj.msg = "no updates to user";
    //     return res.status(200).json(responseObj);
    //   } else {
    //     // no user in session
    //     responseObj.ok = true;
    //     responseObj.count = 0;
    //     responseObj.data = null;
    //     responseObj.msg = "no user";
    //     return res.status(200).json(responseObj);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   responseObj.ok = false;
    //   responseObj.count = 0;
    //   responseObj.data = null;
    //   responseObj.msg = (err as Error).message;
    //   return res.status(500).json(responseObj);
    // }
  }
}
