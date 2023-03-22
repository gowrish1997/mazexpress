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

let responseObj = new APIResponse<any>();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validUser: APIResponse<User> = await fetchServer(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    console.log('valid user', validUser) // validUser.data => object[]

    // console.log('session from login', req.session.user)
    if (req.session.user) {
      // user is already present
      // reject

      responseObj.data = null;
      responseObj.ok = false;
      responseObj.msg = "please logout first";
      responseObj.count = 0;
      res.status(500).json(responseObj);

    } else if (validUser.data && !req.session.user) {
      // no user logged in continue
      // store user in session

      req.session.user = validUser.data[0] as User;
      await req.session.save();

      responseObj.data = validUser.data;
      responseObj.ok = true;
      responseObj.msg = validUser.msg;
      responseObj.count = 1;
      res.status(200).json(responseObj);

    } else {
      // not valid user
      responseObj.data = null;
      responseObj.ok = true;
      responseObj.msg = "not valid user";
      responseObj.count = 0;
      res.status(200).json(responseObj);

    }
  } catch (error) {

    responseObj.data = null;
    responseObj.ok = false;
    responseObj.msg = (error as Error).message;
    responseObj.count = 0;
    res.status(500).json(responseObj);
  }
}
