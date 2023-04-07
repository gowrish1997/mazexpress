//==========================
//     written by: raunak
//==========================
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
export default withIronSessionApiRoute(loginRoute, sessionOptions);
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    try {
      // bind user authorization data to req.session
      if (req.method === "POST") {
        // console.log(req.body)
        req.session.is_admin = req.body.is_admin;
        req.session.save().then(() => {
          res
            .status(200)
            // .json({ message: "done" });
            .setHeader("Content-Type", "application/json")
            .setHeader("Cache-Control", "max-age=180000")
            .end(JSON.stringify({ message: "done" }));
          console.log(req.session);
          resolve();
        });
      }
    } catch (err) {
      if (err) console.error(err);
      res.json(err);
      res.status(405).end();
      resolve(); // in case something goes wrong in the catch block (as vijay commented)
    }
  });
}
