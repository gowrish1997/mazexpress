// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { INotification } from "@/models/notification.interface";
import type { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
var bodyParser = require("body-parser");

type Data = {
  msg: string;
  data?: any;
};

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   console.log("");
  return new Promise(async (resolve, reject) => {
    // console.log('pre', req.body)

    // console.log('post', req.body)

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
        try {
          // console.log(req)
          const form = new multiparty.Form();
          const data: any = await new Promise((resolve, reject) => {
            form.parse(req, function (err, fields, files) {
              if (err) reject({ err });
              resolve({ fields, files });
            });
          });

          // console.log("req data", data.fields["users[]"]);
          Promise.all(
            data.fields["users[]"].map((user: string) => {
              return db("notifications")
                .insert({
                  user_id: parseInt(user),
                  title_notifications:
                    data.fields["data[title_notifications]"][0],
                  content_notifications:
                    data.fields["data[content_notifications]"][0],
                })
                .then((data: any) => {
                  return true;
                });
            })
          ).then((result) => {
            // console.log(result);
            res.json({ msg: "done" });
            resolve({ msg: "done" });
          });
        } catch (error) {
          console.log(error);
        }

        break;

      case "PUT":
        await runMiddleware(req, res, bodyParser.json());
        // console.log(result)
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = { ...req.body };
          console.log(fields);
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

export const config = {
  api: {
    bodyParser: false,
  },
};
