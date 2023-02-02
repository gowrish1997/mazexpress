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
        // console.log("from addresses, user=", req.query.user);
        if (req.query.user) {
          const user_id = req.query.user;
          // list response
          db("addresses")
            .where("user_id", user_id)
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
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      case "POST":
        db("addresses")
          .insert({
            user_id: req.body.user_id,
            address_1_addresses: req.body.address_1,
            address_2_addresses: req.body.address_2,
            city_addresses: req.body.city,
            country_addresses: req.body.country,
            pincode_addresses: req.body.pincode,
            state_addresses: req.body.state,
            phone_addresses: req.body.phone,
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
            address_1_addresses: req.body.address_1,
            address_2_addresses: req.body.address_2,
            city_addresses: req.body.city,
            country_addresses: req.body.country,
            pincode_addresses: req.body.pincode,
            state_addresses: req.body.state,
            phone_addresses: req.body.phone,
            tag_addresses: req.body.tag,
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
