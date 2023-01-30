import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/models/user.interface";


export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<IUser>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json(req.session.user);
  } else {
    res.json({
      first_name_users: "",
      email_users: "",
      avatar_url_users: "",
      id_users: null,
      last_name_users: "",
      phone_users: "",
      password_users: "",
      isAdmin: 0,
      default_address_users: 0,
      isLoggedIn: false
    });
  }
}
