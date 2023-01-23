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
  //   console.log("");
  return new Promise((resolve, reject) => {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
          const id = req.query.id;
          // list response
          res.status(200).json({ msg: "single" });
        } else {
          res.status(200).json({ msg: "list" });
        }
        break;

      case "POST":
        // const body = JSON.parse(req.body)
        res.status(200).json({ msg: "create", data: req.body });
        break;

      case "PUT":
        if (req.query.id) {
          // update
          res.status(200).json({ msg: "put", data: req.body });
        } else {
          res.status(200).json({ msg: "invalid enter user id in url params" });
        }
        break;

      case "DELETE":
        if (req.query.id) {
          // update
          res.status(200).json({ msg: "delete" });
        } else {
          res.status(200).json({ msg: "invalid enter user id in url params" });
        }
        break;

      default:
        res.status(200).json({ msg: "default" });
    }
  });
}
