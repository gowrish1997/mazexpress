//==========================
//     written by: raunak
//==========================

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "@/lib/fetchServer";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validUser = await fetchJson(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    // console.log('valid user', validUser) // validUser.data => object

    // console.log('session from login', req.session.users)
    if (validUser.data && req.session.users && req.session.users.length > 0) {
      req.session.users = [...req.session.users, validUser.data];
      await req.session.save();
      res.json(validUser);
    } else if (validUser.data) {
      req.session.users = [validUser.data];
      await req.session.save();
      res.status(200).json({ msg: validUser.msg, data: validUser.data });
    } else {
      res.status(500).json({ msg: "some error", data: null });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
