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
              query: "SELECT * FROM users where id_users=?",
              values: [id],
            },
            (results) => {
              console.log("results", results);
              res.status(200).json(results);
            }
          );
        } else {
          // list response
          executeQuery(
            {
              query: "SELECT * FROM users",
              values: [],
            },
            (results) => {
              console.log("results", results);
              res.status(200).json(results);
            }
          );
        }
        break;

      case "POST":
        // create new user
        // default icon avatar url
        //
        // hash pass
        const hash = hashPassword(req.body.password);
        executeQuery(
          {
            query:
              "INSERT INTO users (first_name_users, last_name_users, email_users, phone_users, password_users, default_address_users, avatar_url_users) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [
              req.body.first_name,
              req.body.last_name,
              req.body.email,
              req.body.phone,
              hash,
              null,
              "/default_user.png",
            ],
          },
          (results) => {
            res.status(200).json(results);
          }
        );
        break;

      case "PUT":
        if (req.query.id) {
          const id = req.query.id;
          const hash = hashPassword(req.body.password);
          console.log(req.body);
          const fields = {
            first_name_users: req.body.first_name,
            last_name_users: req.body.last_name,
            email_users: req.body.email,
            phone_users: req.body.phone,
            password_users: hash,
            default_address_users: parseInt(req.body.default_address),
            avatar_url_users: req.body.avatar_url,
          };
          executeQuery(
            {
              query: "UPDATE users SET ? WHERE id_users = ? ",
              values: [fields, id],
            },
            (results) => {
              res.status(200).json(results);
            }
          );
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          executeQuery(
            {
              query: "DELETE FROM users WHERE id_users=?",
              values: [id],
            },
            (results) => {
              res.status(200).json(results);
            }
          );
        } else {
          // error response
          res.status(200).json({ msg: "invalid url params" });
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
    }
  });
}
