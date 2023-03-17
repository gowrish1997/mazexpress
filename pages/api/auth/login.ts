//==========================
//     written by: raunak
//==========================

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import fetchServer from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

let responseObj = new APIResponse<any>()

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validUser: APIResponse<User> = await fetchServer(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    // console.log('valid user', validUser) // validUser.data => object

    // console.log('session from login', req.session.users)
    if (validUser.data && req.session.users && req.session.users.length > 0) {
      req.session.users = [...req.session.users, validUser.data];
      await req.session.save();
      responseObj.data = validUser.data
      res.json(validUser.data);
    } else if (validUser.data) {
      req.session.users = validUser.data;
      await req.session.save();
      res.status(200).json({ msg: validUser.msg, data: validUser.data });
    } else {
      res.status(500).json({ msg: "some error", data: null });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
