// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSessionRoute } from "@/lib/config/withSession";
import { db, executeQuery } from "@/lib/db";
import { mazID } from "@/lib/helper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
  data?: any;
};

export default withSessionRoute(handler);

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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
            db("orders").then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
          }
        } else {
          const user_id = req.query.user;
          // console.log(req.query.user);
          db("orders")
            .where("user_id", user_id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        }
        break;

      case "POST":
        db("addresses")
          .where("id_addresses", req.body.address_id)
          .first()
          .then((data: any) => {
            let maz = mazID(data.city_addresses);
            const fields = { ...req.body, id_orders: maz };
            db("orders")
              .insert(fields)
              .then((data2: any) => {
                res.status(200).json(data2);
                resolve(data);
              });
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
