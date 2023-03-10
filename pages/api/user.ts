import { User } from "@/models/user.model";
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

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  if (req.session.user) {
    console.log(req.session)
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
    });
  } else {
    res.json(null);
  }
}
