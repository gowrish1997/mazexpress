// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise(async (resolve, reject) => {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          // single response
          const id = req.query.id;
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
            .where("id_users", id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          console.log("use else");

          // list response
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
            "is_logged_in_users",
            "age_users",
            "gender_users",
            "created_on_user"
          )
            .from("users")
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        }
        break;

      case "POST":
        // create new user
        // default icon avatar url
        //
        // hash pass
        const hash = hashPassword(req.body.password);
        db("users")
          .insert({
            first_name_users: req.body.first_name,
            last_name_users: req.body.last_name,
            email_users: req.body.email,
            phone_users: req.body.phone,
            password_users: hash,
            default_address_users: null,
            avatar_url_users: "default_user.png",
          })
          .then((data: any) => {
            res.status(200).json(data);
          });

        break;

      case "PUT":
        console.log("request received");
        if (req.query.id) {
          const id = req.query.id;
          const fields = { ...req.body };
          if (req.body.password_users) {
            // change pass
            const hash = hashPassword(req.body.password_users);
            fields.password_users = hash;
          }
          db("users")
            .where("id_users", id)
            .update(fields)
            .then((data: any) => {
              console.log("updated user!");
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
                .where("id_users", id)
                .then((data: any) => {
                  res.status(200).json(data);
                  resolve(data);
                });
            });
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;

          db("users")
            .where("id_users", id)
            .del()
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
        reject();
    }
  });
}
