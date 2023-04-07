//==========================
//     written by: raunak
//==========================
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
export default withIronSessionApiRoute(loginRoute, sessionOptions);
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    // bind user authorization data to req.session
    if (req.method === "POST") {
      req.session.is_admin = req.body.is_admin;
      await req.session.save();
      res.status(200).json({ message: "done" });
    }
  } catch (err) {
    if (err) console.error(err);
    res.status(500).json({ message: "failed" });
  }
}
