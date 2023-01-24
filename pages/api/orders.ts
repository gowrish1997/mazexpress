// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { executeQuery } from "@/lib/db";
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
            executeQuery(
              {
                query: "SELECT * FROM orders WHERE id_orders=?",
                values: [id],
              },
              (results) => {
                console.log("results", results);
                res.status(200).json({ msg: "single", data: results });
              }
            );
          } else {
            res
              .status(200)
              .json({ msg: "invalid enter user id in url params" });
          }
        } else {
          const user_id = req.query.user;
          // list response
          executeQuery(
            {
              query: "SELECT * FROM orders WHERE user_id=?",
              values: [user_id],
            },
            (results) => {
              console.log("results", results);
              res.status(200).json({ msg: "list", data: results });
            }
          );
        }
        break;

      case "POST":
        executeQuery(
          {
            query:
              "INSERT INTO orders (user_id, address_id, reference_id_orders, store_link_orders, status_orders, shipping_amt_orders) VALUES (?, ?, ?, ?, ?, ?)",
            values: [
              req.body.user_id,
              req.body.address_id,
              req.body.reference_id,
              req.body.store_link,
              "processing",
              req.body.shipping_amt,
            ],
          },
          (results) => {
            res.status(200).json({ msg: "create", data: results });
          }
        );
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
          executeQuery(
            {
              query: "UPDATE orders SET ? WHERE id_orders = ? ",
              values: [fields, id],
            },
            (results) => {
              res.status(200).json({ msg: "put", data: results });
            }
          );
        } else {
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          executeQuery(
            {
              query: "DELETE FROM orders WHERE id_orders=?",
              values: [id],
            },
            (results) => {
              res.status(200).json({ msg: "delete", data: results });
            }
          );
        } else {
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
    }
  });
}
