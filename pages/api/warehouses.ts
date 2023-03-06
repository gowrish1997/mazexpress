// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MazDataSource } from "@/lib/adapter/data-source.zwei";
import { WarehouseEntity } from "@/lib/adapter/entities/WarehouseEntity";
import { APIResponse } from "@/models/api.model";
import type { NextApiRequest, NextApiResponse } from "next";



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<WarehouseEntity>>
) {
  return new Promise(async (resolve, reject) => {
    let DS = await MazDataSource;
    let responseObj = new APIResponse<WarehouseEntity>();

    switch (req.method) {
      case "GET":
        if (req.query.id) {
          const id = req.query.id;
          // single response

          let warehouses = await DS?.getRepository(WarehouseEntity).findOneBy({ id: id as string })
          if (warehouses) {
            res.status(200).json({ data: [warehouses], msg: 'success' });
            resolve(warehouses);
          } else {
            res.status(200).json({ data: [], msg: 'success' });
            resolve(warehouses);
          }
        } else {
          // list response
          let warehouses = await DS?.getRepository(WarehouseEntity).find()
          console.log(warehouses)
          res.status(200).json({ data: warehouses, msg: 'success' });
          resolve(warehouses);

        }
        break;

      case "POST":

        let insertedWarehouse = await DS?.getRepository(WarehouseEntity).insert(req.body)
        if (insertedWarehouse) {
          res.status(200).json({ data: insertedWarehouse.identifiers[0].id, msg: 'success' });
          resolve(insertedWarehouse);
        } else {
          res.status(500).json({ msg: 'failed' });
          reject()
        }
        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const fields = {
            ...req.body
          };
          let updatedWarehouse = await DS?.getRepository(WarehouseEntity).update(id, fields)
          res.status(200).json({ msg: 'success' });
          resolve(updatedWarehouse);
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;

          let deletedWarehouse = await DS?.getRepository(WarehouseEntity).delete(id)
          res.status(200).json({ msg: 'success' });
          resolve(deletedWarehouse);

        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "default" });
        reject("invalid url params");
    }
  });
}
