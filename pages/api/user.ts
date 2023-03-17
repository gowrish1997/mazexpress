import fetchServer from "@/lib/fetchServer";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.session.users) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed

      if (req.session.users.length === 1) {
        // return the only user
        res.json({
          ...req.session.users[0],
        });
      } else {
        // multiple users logged in
        // which to send? needs update
        res.json({
          ...req.session.users[1],
        });
      }
    } else {
      // no users in session
      res.json(null);
    }
  }
  // if (req.method === "PUT") {
  //   console.log(req.body);
  //   // update server and req.session

  //   const updateServer = await fetchServer(`/api/user?id=${req.body.user_id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ default_address: req.body.default_address }),
  //   });

  //   const user = await fetchServer(`/api/users?id=${req.body.user_id}`);

  //   console.log(updateServer);
  //   console.log(user);

  //   if (req.session.user && user) {
  //     // in a real world application you might read the user id from the session and then do a database request
  //     // to get more information on the user if needed
  //     req.session.user = user;
  //     req.session.save();
  //     res.json({
  //       ...user,
  //     });
  //   } else {
  //     res.json(null);
  //   }
  // }
}
