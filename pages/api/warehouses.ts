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
  return new Promise((resolve, reject) => {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          const id = req.query.id;
          // single response

          executeQuery(
            {
              query: "SELECT * FROM warehouses WHERE id_warehouses=?",
              values: [id],
            },
            (results) => {
              // console.log("results", results);
              res.status(200).json(results);
            }
          );
        } else {
          // list response
          executeQuery(
            {
              query: "SELECT * FROM warehouses",
              values: [],
            },
            (results) => {
              // console.log("results", results);
              res.status(200).json(results);
            }
          );
        }
        break;

      case "POST":
        executeQuery(
          {
            query:
              "INSERT INTO warehouses (tag_warehouses, address_1_warehouses, address_2_warehouses, city_warehouses, country_warehouses, pincode_warehouses, state_warehouses, phone_warehouses, status_warehouses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values: [
              req.body.tag,
              req.body.address_1,
              req.body.address_2,
              req.body.city,
              req.body.country,
              req.body.pincode,
              req.body.state,
              req.body.phone,
              req.body.status,
            ],
          },
          (results) => {
            res.status(200).json({ msg: "create", data: results });
          }
        );
        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const fields = {
            tag_warehouses: req.body.tag,
            address_1_warehouses: req.body.address_1,
            address_2_warehouses: req.body.address_2,
            city_warehouses: req.body.city,
            country_warehouses: req.body.country,
            pincode_warehouses: req.body.pincode,
            state_warehouses: req.body.state,
            phone_warehouses: req.body.phone,
            status_warehouses: req.body.status,
          };
          executeQuery(
            {
              query: "UPDATE warehouses SET ? WHERE id_warehouses = ? ",
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
          res.status(200).json({ msg: "delete" });
        } else {
          res.status(200).json({ msg: "invalid enter user id in url params" });
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
    }
  });
}
