import { withSessionRoute } from "@/lib/config/withSession";
import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
export default withSessionRoute(logout);

async function logout(req: NextApiRequest, res: NextApiResponse, session: IronSession) {
  // set logged in false
  
  req.session.destroy();
  res.send({ ok: true });
}
