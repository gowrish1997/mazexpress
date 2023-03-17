import fetchServer from "@/lib/fetchServer";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.session.users && req.session.users) {
      // console.log("sess", req.session.users);
      if (req.session.users.length > 0) {
        // return the only user
        const user = await fetchServer(
          `/api/users?id=${req.session.users[0].id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        // console.log("user", user);
        req.session.users = user.data;
        await req.session.save();

        if (user?.data?.[0]) {
          res.json({ data: user?.data });
        } else {
          res.json(null);
        }
      } else {
        // multiple users logged in
        // which to send? needs update
        const user = await fetchServer(
          `/api/users?id=${req.session.users[1].id}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        // console.log("user", user);
        if (user) {
          res.json({ data: user?.data });
        } else {
          res.json(null);
        }
      }
    } else {
      // no users in session
      res.json(null);
    }
  }
}
