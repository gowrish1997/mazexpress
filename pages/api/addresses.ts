import { APIResponse } from "@/models/api.model";
import { MazDataSource } from "@/lib/adapter/data-source";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg?: string;
  data?: any;
  count?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   console.log("");
  return new Promise(async (resolve, reject) => {
    let DS = await MazDataSource;
    let responseObj = new APIResponse<AddressEntity>();

    switch (req.method) {
      case "GET":
        // console.log("from addresses, user=", req.query.user);
        if (req.query.user) {
          const user_id = req.query.user;
          let addresses = await DS?.getRepository(AddressEntity).findAndCountBy(
            {
              user: {
                id: user_id as string,
              },
            }
          );
          if (addresses) {
            responseObj.count = addresses[1];
            responseObj.data = addresses[0];
            responseObj.ok = true;

            res.status(200).json(responseObj);
            resolve(responseObj);
          }
        } else if (req.query.id) {
          // single response
          const id = req.query.id;
          let addresses = await DS?.getRepository(AddressEntity).findOneBy({
            id: id as string,
          });
          if (addresses) {
            responseObj.count = 1;
            responseObj.data = [addresses];
            responseObj.ok = true;
            res.status(200).json(responseObj);
            resolve(responseObj);
          }
        } else {
          let addresses = await DS?.getRepository(AddressEntity).findAndCount();
          if (addresses) {
            responseObj.count = addresses[1];
            responseObj.data = addresses[0];
            responseObj.ok = true;
            res.status(200).json(responseObj);
            resolve(responseObj);
          }
        }
        break;

      case "POST":
        const fields = { ...req.body };
        let insertResult = await DS?.getRepository(AddressEntity).insert(
          fields
        );
        if (insertResult) {
          responseObj.count = 1;
          responseObj.data = [insertResult.identifiers[0].id];
          responseObj.ok = true;
          res.status(200).json(responseObj);
          resolve(responseObj);
        }
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
