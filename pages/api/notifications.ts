// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db, executeQuery } from "@/lib/db";
import { INotification } from "@/models/notification.interface";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   console.log("");
  return new Promise((resolve, reject) => {
    switch (req.method) {
      case "GET":
        // console.log("from addresses, user=", req.query.user);
        if (req.query.user) {
          const user_id = req.query.user;
          // list response

          db("notifications")
            .where({
              user_id: user_id,
            })
            .whereNot({
              status_notifications: "deleted",
            })
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else if (req.query.id) {
          // single response
          const id = req.query.id;
          db("notifications")
            .where({
              id_notifications: id,
            })
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });

          // error invalid
        } else {
          res.status(500).end();
          reject();
        }
        break;

      case "POST":
        const obj: INotification = req.body;

        db("notifications")
          .insert({
            user_id: obj.user_id,
            title_notifications: obj.title_notifications,
            content_notifications: obj.content_notifications,
          })
          .then((data: any) => {
            res.status(200).json(data);
            resolve(data);
          });

        break;

      case "PUT":
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = { ...req.body };
          db("notifications")
            .where("id_notifications", id)
            .update(fields)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          db("notifications")
            .where("id_notifications", id)
            .del()
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "not allowed" });
        reject();
    }
  });
}
