// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { executeQuery } from "@/lib/db";
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

          executeQuery(
            {
              query:
                "SELECT * FROM notifications WHERE user_id=? AND status_notifications != 'deleted'",
              values: [user_id],
            },
            (results) => {
              // console.log("results", results);
              res.status(200).json(results);
              resolve(results);
            }
          );
        } else if (req.query.id) {
          // single response
          const id = req.query.id;
          executeQuery(
            {
              query: "SELECT * FROM notifications WHERE id_notifications=?",
              values: [id],
            },
            (results) => {
              // console.log("results", results);
              res.status(200).json(results[0]);
              resolve(results);
            }
          );
          // error invalid
        } else {
          res.status(500).end();
          reject();
        }
        break;

      case "POST":
        const obj: INotification = req.body;

        executeQuery(
          {
            query:
              "INSERT INTO notifications (user_id, title_notifications, content_notifications) VALUES (?, ?, ?)",
            values: [
              obj.user_id,
              obj.title_notifications,
              obj.content_notifications,
            ],
          },
          (results) => {
            res.status(200).json(results);
            resolve(results);
          }
        );
        break;

      case "PUT":
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = { ...req.body };
          executeQuery(
            {
              query: "UPDATE notifications SET ? WHERE id_notifications = ? ",
              values: [fields, id],
            },
            (results) => {
              res.status(200).json(results);
              resolve(results);
            }
          );
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          executeQuery(
            {
              query: "DELETE FROM notifications WHERE id_notifications=?",
              values: [id],
            },
            (results) => {
              res.status(200).json(results);
              resolve(results);
            }
          );
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
