import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { JwtPayload } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    if (req.method === "POST") {
      const payload: JwtPayload = req.body;
      if (payload) {
        console.log(payload.email)
        const user: APIResponse<User> = await fetchJson(
          `/api/users/${payload.email}`
        );
        console.log(user)
        // if (user.data && user.data.length > 0) {
        //   // existing user log them in
        //   const logged_in = await fetchJson(`/api/auth/login`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       username: payload.email,
        //       password: "Test123$",
        //     }),
        //     headers: { "Content-Type": "application/json" },
        //   });
        //   if (logged_in.msg === "success") {
        //     // user is present
        //     return res
        //       .status(200)
        //       .json({ ok: true, msg: logged_in.msg, data: logged_in.data });
        //   } else {
        //     return res
        //       .status(200)
        //       .json({ ok: false, msg: logged_in.msg, data: logged_in.data });
        //   }
        // } else {
        //   // create new user
        //   const userObj: Partial<User> = {
        //     email: payload.email,
        //     first_name: payload.given_name,
        //     last_name: payload.family_name,
        //     avatar_url: payload.picture,
        //     // change to generated password
        //     password: "Test123$",
        //   };
        //   const newuser: APIResponse<User> = await fetchJson(`/api/users`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(userObj),
        //   });
        //   if (newuser.data && newuser.data.length > 0) {
        //     // success
        //     // set Main user here
        //     return res.status(200).json({ ok: true, data: newuser.data });
        //   } else {
        //     return res.status(401).json({ ok: false, data: newuser.data });
        //   }
        // }
      } else {
        reject("no payload");
      }
    } else {
      reject("bad request");
    }
  });
}
