// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSessionRoute } from "@/lib/config/withSession";
import { db } from "@/lib/db";
import { mazID } from "@/lib/helper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg?: string;
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

          db("orders")
            .where("user_id", user_id)
            .then((data: any) => {
              res.status(200).json(data);
              resolve(data);
            });
        }
        break;

      case "POST":
          let addr_id_int = parseInt(req.body.address_id)
        //   console.log(addr_id_int)

        db("addresses")
          .where("id_addresses", addr_id_int)
          .first()
          .then((data: any) => {
            let maz = mazID(data.city_addresses);
            const fields = { ...req.body, id_orders: maz };
            db("orders")
              .insert(fields)
              .then((data2: any) => {
                res.status(200).json({ data: maz });
                resolve(data);
              });
          });

        break;

      case "PUT":
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = {...req.body};

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
