//==========================
//     written by: raunak
//==========================

import { User } from "@/models/user.model";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User | null>) {
  req.session.destroy();
  res.json(null);
}
