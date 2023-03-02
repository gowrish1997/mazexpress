// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
          // db("warehouses")
          //   .where("id_warehouses", id)
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          // list response
          // db("warehouses").then((data: any) => {
          //   res.status(200).json(data);
          //   resolve(data);
          // });
        }
        break;

      case "POST":
        // db("warehouses")
        //   .insert({
        //     tag_warehouses: req.body.tag,
        //     address_1_warehouses: req.body.address_1,
        //     address_2_warehouses: req.body.address_2,
        //     city_warehouses: req.body.city,
        //     country_warehouses: req.body.country,
        //     pincode_warehouses: req.body.pincode,
        //     state_warehouses: req.body.state,
        //     phone_warehouses: req.body.phone,
        //     status_warehouses: req.body.status,
        //   })
        //   .then((data: any) => {
        //     res.status(200).json(data);
        //     resolve(data);
        //   });

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
          // db("warehouses")
          //   .where("id_warehouses", id)
          //   .update(fields)
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          // db("warehouses")
          //   .where("id_warehouses", id)
          //   .del()
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          res.status(500).json({ msg: "invalid enter user id in url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "default" });
        reject("invalid url params");
    }
  });
}
