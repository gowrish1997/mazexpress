import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { JwtPayload } from "jsonwebtoken";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    if (req.method === "POST") {
      const payload: JwtPayload = req.body;
      // console.log(payload)
      if (payload) {
        const user: APIResponse<User> = await fetchJson(
          `/api/users?email=${payload.email}`
        );
        // console.log("existing user", user);
        if (user.data && user.data.length > 0) {
          req.session.user = user.data[0] as User;
          await req.session.save();

          res.status(200).json({ ok: true, user: user.data[0] });
          //   resolve(payload);
        } else {
          // create new user
          const userObj: Partial<User> = {
            email: payload.email,
            first_name: payload.given_name,
            last_name: payload.family_name,
            avatar_url: payload.picture,
            password: "Test123$",
          };
          const newuser: APIResponse<User> = await fetchJson(`/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObj),
          });
          // console.log("new user", newuser);
          if (newuser.data && newuser.data.length > 0) {
            // success
            req.session.user = newuser.data[0] as User;
            await req.session.save();

            res.status(200).json({ ok: true, user: newuser.data[0] });
            // resolve(newuser);
          } else {
            res.status(401).json({ ok: false, user: null });
            // reject();
          }
        }
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
}
