// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg?: string;
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
          db("tracking")
            .where("id_tracking", id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          // list response
          if (req.query.user) {
            db("tracking")
              .where("user_id", req.query.user)
              .then((data: any) => {
                res.status(200).json(data);
                resolve(data);
              });
          } else if (req.query.order) {
            db("tracking")
              .where("order_id", req.query.order)
              .then((data: any) => {
                res.status(200).json(data);
                resolve(data);
              });
          } else {
            db("tracking").then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
          }
        }
        break;

      case "POST":
        db("tracking")
          .insert({
            order_id: req.body.order_id,
            stage_tracking: req.body.stage_tracking,
            poc_tracking: req.body.poc_tracking,
            user_id: req.body.user_id,
          })
          .then((data: any) => {
            res.status(200).json(data);
            resolve(data);
          });

        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const fields = { ...req.body };
          db("tracking")
            .where("id_tracking", id)
            .update(fields)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          // error response
          res.json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          db("tracking")
            .where("id_tracking", id)
            .del()
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else {
          // error response
          res.status(500).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "default" });
        reject();
    }
  });
}
