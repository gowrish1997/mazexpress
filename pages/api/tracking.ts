import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MazDataSource } from "@/lib/adapter/data-source";
import { TrackingEntity } from "@/lib/adapter/entities/TrackingEntity";
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
  return new Promise(async (resolve, reject) => {
    let DS = await MazDataSource;

    switch (req.method) {
      case "GET":
        if (req.query.id) {
          // single response
          const id = req.query.id;
          let trackingIdResults = await DS?.getRepository(
            TrackingEntity
          ).findAndCountBy({
            id: id as string,
          });
          if (trackingIdResults) {
            res.status(200).json({
              data: trackingIdResults[0],
              count: trackingIdResults[1],
            });
            resolve(trackingIdResults);
          }
        } else {
          // list response
          if (req.query.user) {
            let user = req.query.user;
            let trackingUserResults = await DS?.getRepository(
              TrackingEntity
            ).findAndCountBy({
              user: { id: user as string },
            });
            if (trackingUserResults) {
              res.status(200).json({
                data: trackingUserResults[0],
                count: trackingUserResults[1],
              });
              resolve(trackingUserResults);
            }
          } else if (req.query.order) {
            let order = req.query.order;
            let trackingOrderResults = await DS?.getRepository(
              TrackingEntity
            ).findAndCountBy({
              order: { id: order as string },
            });
            if (trackingOrderResults) {
              res.status(200).json({
                data: trackingOrderResults[0],
                count: trackingOrderResults[1],
              });
              resolve(trackingOrderResults);
            }
          } else {
            let trackingResults = await DS?.getRepository(
              TrackingEntity
            ).findAndCount();
            if (trackingResults) {
              res.status(200).json({
                data: trackingResults[0],
                count: trackingResults[1],
              });
              resolve(trackingResults);
            }
          }
        }
        break;

      case "POST":
        if (req.body.orders !== undefined) {
          // orders field exists send back latest tracking update for all ids in orders
          // let order_ids: string[] = [...req.body.orders];
          // const bulk_tracking_results = order_ids.map((order_id) => {
          //   // fetch latest tracking for order id
          //   return db("tracking")
          //     .max("stage_tracking as stage")
          //     .where("order_id", order_id)
          //     .first();
          // });
          // Promise.all(bulk_tracking_results).then((results) => {
          //   console.log(results);
          //   res.status(200).json({ data: results });
          //   resolve(results);
          // });
        } else {
          let order_id = req.body.order_id;
          let order = await DS?.getRepository(OrderEntity).findOneBy({
            id: order_id,
          });
          if (order) {
            let trackingResults = await DS?.getRepository(
              TrackingEntity
            ).insert({
              order: order,
              user: order.user,
              stage: req.body.stage
            });
            if (trackingResults) {
              res.status(200).json({
                data: trackingResults.identifiers[0].id,
                count: 1,
              });
              resolve(trackingResults);
            }
          }
        }

        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const fields = { ...req.body };
          // db("tracking")
          //   .where("id_tracking", id)
          //   .update(fields)
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          // error response
          res.json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          // db("tracking")
          //   .where("id_tracking", id)
          //   .del()
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          // error response
          res.status(500).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "default" });
        reject();
    }
  });
}
