import { INotificationConfig } from "@/models/notification.interface";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "@/lib/fetchJson";
import axios from "axios";

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
        console.log(req.body);
        // hash pass
        try {
          const hash = hashPassword(req.body.password_users);
          db("users")
            .insert({
              first_name_users: req.body.first_name_users,
              last_name_users: req.body.last_name_users,
              email_users: req.body.email_users,
              phone_users: req.body.phone_users,
              password_users: hash,
              default_address_users: null,
              avatar_url_users: "default_user.png",
            })
            .then((data: any) => {
              // created default keep notifications on

              // check if notification setting is on and
              db("notification_config")
                .where("id_notification_config", 3)
                .first()
                .then(
                  async (welcomeNotificationConfig: INotificationConfig) => {
                    if (
                      welcomeNotificationConfig.is_enabled_notification_config
                    ) {
                      // send welcome message to new account

                      db("notifications")
                        .insert({
                          user_id: data[0],
                          title_notifications: "Welcome to MazExpress!",
                          content_notifications:
                            "Thank you for choosing MazExpress as your delivery service, hope you have a wonderful shopping experience, please get in touch with us for any queries or issues by going to help-center.",
                        })
                        .then((data: any) => {
                          res.status(200).json(data);
                          resolve(data);
                        });
                    }
                  }
                );
            });
        } catch (err) {
          if (err) throw err;
          console.log(err);
          res
            .status(500)
            .json({ msg: "an error occurred check console for more info" });
          reject();
        }

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
