import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/models/user.interface";
import { executeQuery } from "@/lib/db";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<IUser>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    executeQuery(
      {
        query:
          "SELECT id_users, first_name_users, last_name_users, email_users, phone_users, default_address_users, avatar_url_users, is_notifications_enabled_users, is_admin_users, is_logged_in_users FROM users WHERE id_users = ?",
        values: [req.session.user.id_users],
      },
      (results) => {
        console.log(results[0]);
        res.json(results[0]);
      }
    );
  } else {
    res.json({
      first_name_users: "",
      email_users: "",
      avatar_url_users: "/default_user.png",
      id_users: 0,
      last_name_users: "",
      phone_users: "",
      password_users: "",
      is_admin_users: 0,
      default_address_users: 0,
      is_logged_in_users: 0,
      is_notifications_enabled_users: 0,
    });
  }
}
