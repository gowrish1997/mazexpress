//==========================
//     written by: raunak
//==========================
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
export default withIronSessionApiRoute(unbind_data, sessionOptions);
function unbind_data(req: NextApiRequest, res: NextApiResponse) {
  try {
    // bind user authorization data to req.session
    if (req.method === "GET") {
      req.session.destroy();
      res.status(200).json({ message: "done" });
    }
  } catch (err) {
    if (err) console.error(err);
    res.status(500).json({ message: "failed" });
  }
}
