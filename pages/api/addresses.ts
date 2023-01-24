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
        if (req.query.user) {
          const user_id = req.query.user;
          // list response
          executeQuery(
            {
              query: "SELECT * FROM addresses where user_id=?",
              values: [user_id],
            },
            (results) => {
              console.log("results", results);
              res.status(200).json({ msg: "list", data: results });
            }
          );
        } else if (req.query.id) {
          // single response
          const id = req.query.id;
          executeQuery(
            {
              query: "SELECT * FROM addresses where id_addresses=?",
              values: [id],
            },
            (results) => {
              console.log("results", results);
              res.status(200).json({ msg: "single", data: results });
            }
          );
          // error invalid
        } else {
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      case "POST":
        executeQuery(
          {
            query:
              "INSERT INTO addresses (user_id, address_1_addresses, address_2_addresses, city_addresses, country_addresses, pincode_addresses, state_addresses, phone_addresses) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            values: [
              req.body.user_id,
              req.body.address_1,
              req.body.address_2,
              req.body.city,
              req.body.country,
              req.body.pincode,
              req.body.state,
              req.body.phone,
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
            address_1_addresses: req.body.address_1,
            address_2_addresses: req.body.address_2,
            city_addresses: req.body.city,
            country_addresses: req.body.country,
            pincode_addresses: req.body.pincode,
            state_addresses: req.body.state,
            phone_addresses: req.body.phone,
          };
          executeQuery(
            {
              query: "UPDATE addresses SET ? WHERE id_addresses = ? ",
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
              query: "DELETE FROM addresses WHERE id_addresses=?",
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
