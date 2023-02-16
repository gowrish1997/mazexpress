import { IOrderResponse } from "@/models/order.interface";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSessionRoute } from "@/lib/config/withSession";
import { db } from "@/lib/db";
import { mazID } from "@/lib/helper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg?: string;
  data?: any;
  total_count?: number;
};

export default withSessionRoute(handler);

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return new Promise((resolve, reject) => {
    switch (req.method) {
      case "GET":
        // search
        if (req.query.search !== undefined) {
          // send back search res
          // getting maz id from search
          db("orders")
            .whereLike("id_orders", req.query.search)
            .then((data: IOrderResponse[]) => {
              res.status(200).json({ data: data });
              resolve(data);
            });
        }

        if (req.query.status !== undefined) {
          // send back status filtered res
          let statusArray = (req.query.status as string).split(',')
          console.log(typeof req.query.status)
          const queryOrders = db("orders")
            .havingIn("status_orders", statusArray)
            .limit(req.query.per_page)
            .offset(
              parseInt(req.query.per_page as string) *
                parseInt(req.query.page as string)
            )
            .then((data: any) => {
              console.log(data);
              return data;
            });

          const allOrdersCount = db("orders")
            .count("id_orders as count")
            .first()
            .then((count: any) => {
              return count;
            });

          Promise.all([queryOrders, allOrdersCount]).then((result) => {
            console.log(result);
            let responseObj: Data = {
              data: result[0],
              total_count: result[1].count,
              msg: "successful",
            };
            res.status(200).json(responseObj);
            resolve(responseObj);
            
          });
          break
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
            const queryOrders = db("orders")
              .limit(req.query.per_page)
              .offset(
                parseInt(req.query.per_page as string) *
                  parseInt(req.query.page as string)
              )
              .then((data: any) => {
                console.log(data);
                return data;
              });

            const allOrdersCount = db("orders")
              .count("id_orders as count")
              // You actually can use string|function with this = knex builder|another knex builder
              .first()
              .then((count: any) => {
                return count;
              });

            Promise.all([queryOrders, allOrdersCount]).then((result) => {
              console.log(result);
              let responseObj: Data = {
                data: result[0],
                total_count: result[1].count,
                msg: "successful",
              };
              res.status(200).json(responseObj);
              resolve(responseObj);
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
        let addr_id_int = parseInt(req.body.address_id);
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
