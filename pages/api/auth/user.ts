import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/models/user.interface";
import { db, executeQuery } from "@/lib/db";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<IUser>) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed

      db.select(
        "id_users",
        "first_name_users",
        "last_name_users",
        "email_users",
        "phone_users",
        "default_address_users",
        "avatar_url_users",
        "is_notifications_enabled_users",
        "is_admin_users",
        "is_logged_in_users"
      )
        .from("users")
        .where("id_users", req.session.user.id_users)
        .first()
        .then((data: any) => {

          res.json(data);
          resolve(data);
        });
      // executeQuery(
      //   {
      //     query:
      //       "SELECT id_users, first_name_users, last_name_users, email_users, phone_users, default_address_users, avatar_url_users, is_notifications_enabled_users, is_admin_users, is_logged_in_users FROM users WHERE id_users = ?",
      //     values: [req.session.user.id_users],
      //   },
      //   (results) => {
      //     // console.log(results[0]);

      //     res.json(results[0]);
      //     resolve(results[0]);
      //   }
      // );
    } else {
      res.json({
        id_users: 0,
        avatar_url_users: "/default_user.png",
        first_name_users: "",
        last_name_users: "",
        email_users: "",
        password_users: "",
        phone_users: "",
        default_address_users: 0,
        is_admin_users: 0,
        is_logged_in_users: 0,
        is_notifications_enabled_users: 0,
      });
      resolve({
        id_users: 0,
        avatar_url_users: "/default_user.png",
        first_name_users: "",
        last_name_users: "",
        email_users: "",
        password_users: "",
        phone_users: "",
        default_address_users: 0,
        is_admin_users: 0,
        is_logged_in_users: 0,
        is_notifications_enabled_users: 0,
      });
    }
  });
}
