// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  //   console.log("");
  return new Promise((resolve, reject) => {
    switch (req.method) {
      case "GET":
        // console.log("from addresses, user=", req.query.user);
        if (req.query.user) {
          const user_id = req.query.user;
          // list response
          db("addresses")
            .where({ user_id: user_id })
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        } else if (req.query.id) {
          // single response
          const id = req.query.id;
          db("addresses")
            .where("id_addresses", id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });

          // error invalid
        } else {
          db("addresses").then((data: any) => {
            res.status(200).json(data);
            resolve(data);
          });
          // res.status(200).json({ msg: "invalid url params" });
        }
        break;

      case "POST":
        const fields = { ...req.body };
        db("addresses")
          .insert(fields)
          .then((data: any) => {
            res.status(200).json(data);
            resolve(data);
          });

        break;

      case "PUT":
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = {
            ...req.body,
          };

          db("addresses")
            .where("id_addresses", id)
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
          db("addresses")
            .where("id_addresses", id)
            .update({ status_addresses: 0 })
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
        res.status(200).json({ msg: "default" });
        reject();
    }
  });
}
