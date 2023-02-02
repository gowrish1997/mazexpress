// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db, executeQuery } from "@/lib/db";
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
        if (!req.query.user) {
          // error invalid
          if (req.query.id) {
            // single response
            const id = req.query.id;
            db("orders")
              .where("id_orders", id)
              .then((data: any) => {
                res.status(200).json(data);
                resolve(data);
              });
          } else {
            res.status(200).json({ msg: "invalid url params" });
            reject("invalid url params");
          }
        } else {
          const user_id = req.query.user;

          db("orders")
            .where("user_id", user_id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        }
        break;

      case "POST":
        db("orders")
          .insert({
            user_id: req.body.user_id,
            address_id: req.body.address_id,
            reference_id_orders: req.body.reference_id,
            store_link_orders: req.body.store_link,
            status_orders: "processing",
            shipping_amt_orders: req.body.shipping_amt,
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
          const fields = {
            user_id: req.body.user_id,
            address_id: req.body.address_id,
            reference_id_orders: req.body.reference_id,
            shipping_amt_orders: req.body.shipping_amt,
            shipped_on_orders: req.body.shipped_on,
            received_on_orders: req.body.received_on,
            delivered_on_orders: req.body.delivered_on,
            status_orders: req.body.status,
            store_link_orders: req.body.store_link,
          };

          db("orders")
            .where("id_orders", id)
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
          db("orders")
            .where("id_orders", id)
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
        res.status(200).json({ msg: "default" });
        reject();
    }
  });
}
