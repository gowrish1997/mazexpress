// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/lib/bcrypt";
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
  return new Promise(async (resolve, reject) => {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          // single response
          const id = req.query.id;
          executeQuery(
            {
              query: "SELECT * FROM tracking where id_tracking=?",
              values: [id],
            },
            (results) => {
              //   console.log("results", results);
              res.status(200).json(results);
              resolve(results);
            }
          );
        } else {
          // list response
          if (req.query.user) {
            executeQuery(
              {
                query: "SELECT * FROM tracking WHERE user_id = ?",
                values: [req.query.user],
              },
              (results) => {
                //   console.log("results", results);
                res.status(200).json(results);
              }
            );
          }
          if (req.query.order) {
            executeQuery(
              {
                query: "SELECT * FROM tracking WHERE order_id = ?",
                values: [req.query.order],
              },
              (results) => {
                // console.log("results", results);
                res.status(200).json(results);
              }
            );
          }
          executeQuery(
            {
              query: "SELECT * FROM tracking",
              values: [],
            },
            (results) => {
            //   console.log("results", results);
              res.status(200).json(results);
              resolve(results)
            }
          );
        }
        break;

      case "POST":
        executeQuery(
          {
            query:
              "INSERT INTO tracking (order_id, stage_tracking, poc_tracking, user_id) VALUES (?, ?, ?, ?)",
            values: [
              req.body.order_id,
              req.body.stage_tracking,
              req.body.poc_tracking,
              req.body.user_id,
            ],
          },
          (results) => {
            res.status(200).json(results);
            resolve(results);
          }
        );
        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const fields = { ...req.body };

          console.log(fields, id);
          executeQuery(
            {
              query: "UPDATE tracking SET ? WHERE id_tracking = ? ",
              values: [fields, id],
            },
            (results) => {
              res.status(200).json(results);
              resolve(results);
            }
          );
        } else {
          // error response
          res.status(500).json({ msg: "invalid url params" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          executeQuery(
            {
              query: "DELETE FROM tracking WHERE id_tracking = ?",
              values: [id],
            },
            (results) => {
              res.status(200).json(results);
              resolve(results);
            }
          );
        } else {
          // error response
          res.status(500).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "default" });
    }
  });
}
