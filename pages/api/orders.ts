import { OrderEntity } from "./../../lib/adapter/entities/OrderEntity";
import { MazDataSource } from "@/lib/adapter/data-source";
import { IOrderResponse } from "@/models/order.interface";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSessionRoute } from "@/lib/config/withSession";
import { db } from "@/lib/db";
import { mazID } from "@/lib/helper";
import { Like } from "typeorm";
import type { NextApiRequest, NextApiResponse } from "next";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

type Data = {
  msg?: string;
  data?: any;
  count?: number;
};

// export default withSessionRoute(handler);
export default handler;

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return new Promise(async (resolve, reject) => {
    let DS = await MazDataSource;
    switch (req.method) {
      case "GET":
        // search
        if (req.query.search !== undefined) {
          // send back search res
          // getting maz id from search
          const searchResults = await DS?.getRepository(OrderEntity).findBy({
            id: Like(`%${req.query.search}%`),
          });
          res.status(200).json({ data: searchResults });
          resolve(searchResults);
        }

        if (req.query.status !== undefined) {
          // send back status filtered res
          // console.log(req.query)
          let statusArray = (req.query.status as string).split(",");
          console.log(statusArray);
          const queryOrders = db("orders")
            .havingIn("status_orders", statusArray)
            .limit(req.query.per_page)
            .offset(
              parseInt(req.query.per_page as string) *
                parseInt(req.query.page as string)
            )
            .then((data: any) => {
              // console.log(data);
              return data;
            });

          const allOrdersCount = db("orders")
            // .havingIn("status_orders", statusArray)
            .where("status_orders", "in", statusArray)
            .count("id_orders as count")
            .first()
            .then((count: any) => {
              return count;
            });

          Promise.all([queryOrders, allOrdersCount]).then((result) => {
            // console.log(result);
            let responseObj: Data = {
              data: result[0],
              count: result[1].count,
              msg: "successful",
            };
            res.status(200).json(responseObj);
            resolve(responseObj);
          });
          break;
        }
        if (!req.query.user) {
          // error invalid
          if (req.query.id) {
            // single response
            const id = req.query.id;

            db("orders")
              .where("id_orders", id)
              .first()
              .then((data: any) => {
                res.status(200).json(data);
                resolve(data);
              });
          } else {
            // get results and count of results

            const queryOrders = await DS?.getRepository(
              OrderEntity
            ).findAndCount({
              take: parseInt(req.query.per_page as string),
              skip:
                parseInt(req.query.per_page as string) *
                parseInt(req.query.page as string),
            });
            if (queryOrders) {
              let responseObj: Data = {
                data: queryOrders[0],
                count: queryOrders[1],
                msg: "successful",
              };
              res.status(200).json(responseObj);
              resolve(responseObj);
            }
            // const queryOrders = db("orders")
            //   .limit(req.query.per_page)
            //   .offset(
            //     parseInt(req.query.per_page as string) *
            //       parseInt(req.query.page as string)
            //   )
            //   .then((data: any) => {
            //     console.log(data);
            //     return data;
            //   });

            // const allOrdersCount = db("orders")
            //   .count("id_orders as count")
            //   // You actually can use string|function with this = knex builder|another knex builder
            //   .first()
            //   .then((count: any) => {
            //     return count;
            //   });

            // Promise.all([queryOrders, allOrdersCount]).then((result) => {
            //   console.log(result);
            //   let responseObj: Data = {
            //     data: result[0],
            //     count: result[1].count,
            //     msg: "successful",
            //   };
            //   res.status(200).json(responseObj);
            //   resolve(responseObj);
            // });
          }
        } else {
          const user_id = req.query.user;

          const queryOrders = await DS?.getRepository(OrderEntity).findAndCount(
            {
              where: { user: { id: user_id as string } },
              take: parseInt(req.query.per_page as string),
              skip:
                parseInt(req.query.per_page as string) *
                parseInt(req.query.page as string),
            }
          );
          if (queryOrders) {
            let responseObj: Data = {
              data: queryOrders[0],
              count: queryOrders[1],
              msg: "successful",
            };
            res.status(200).json(responseObj);
            resolve(responseObj);
          }
        }
        break;

      case "POST":
        let user = await DS?.getRepository(UserEntity).findOneBy({
          id: req.body.user_id,
        });
        let address_id = req.body.address_id;
        let address = await DS?.getRepository(AddressEntity).findOneBy({
          id: address_id,
        });
        if (address) {
          let maz = mazID(address.city);
          // change maz id code
          const fields: Omit<
            OrderEntity,
            "created_on" | "received_on" | "delivered_on" | "shipped_on" | "id" | "tracking"
          > = {
            reference_id: req.body.reference_id,
            store_link: req.body.store_link,
            status: req.body.status,
            shipping_amt: req.body.shipping_amt,
            maz_id: maz,
            user: user!,
            address: address!,
          };

          let insertedOrder = await DS?.getRepository(OrderEntity).insert(
            fields
          );

          // console.log(insertedOrder);
          res.status(200).json({ data: insertedOrder?.identifiers[0].id });
          resolve(insertedOrder);
        }

        break;

      case "PUT":
        if (req.query.id) {
          // update
          const id = req.query.id;
          const fields = { ...req.body };

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
