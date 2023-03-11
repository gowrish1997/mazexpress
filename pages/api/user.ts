import fetchServer from "@/lib/fetchServer";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export enum UserGender {
  MALE = "m",
  FEMALE = "f",
  OTHER = "o",
  UNKNOWN = "u",
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.method)
  // res.json({msg: 'cool'})

  if (req.method === "GET") {
    console.log();
    if (req.session.user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed

      // console.log("executing 1");
      res.json({
        ...req.session.user,
      });
    } else {
      // console.log("executing 2");
      res.json(null);
    }
  }
  if (req.method === "PUT") {
    console.log(req.body);
    // update server and req.session

    const updateServer = await fetchServer(`/api/user?id=${req.body.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ default_address: req.body.default_address }),
    });

    const user = await fetchServer(`/api/users?id=${req.body.user_id}`);

    console.log(updateServer);
    console.log(user);

    if (req.session.user && user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      req.session.user = user;
      req.session.save();
      res.json({
        ...user,
      });
    } else {
      res.json(null);
    }
  }
}
