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
    // get user from db

    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username });

    // const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
    const validUser = await fetchJson(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // console.log(validUser)
    req.session.user = validUser.data;
    await req.session.save();
    res.json(validUser);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
