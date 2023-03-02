// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
  data?: any;
};

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   console.log("");
  return new Promise(async (resolve, reject) => {
    // console.log('pre', req.body)

    // console.log('post', req.body)

    switch (req.method) {
      case "GET":
        // console.log("from addresses, user=", req.query.user);
        try {
          // db("notification_config").then((data: any) => {
          //   res.status(200).json(data);
          //   resolve(data);
          // });
        } catch (err) {
          if (err) throw err;
          console.log(err);
          res
            .status(500)
            .json({ msg: "an error occurred check console for more info" });
        }

        break;

      case "POST":
        const obj = req.body;
        try {
        } catch (error) {
          if (error) throw error;
          console.log(error);
          res.json({ msg: "an error occurred" });
        }

        break;

      case "PUT":
        // await runMiddleware(req, res, bodyParser.json());
        console.log("got");
        if (req.body.setTo !== undefined) {
          // update
          console.log(req.body);
          const id = req.body.id;
          const setTo = req.body.setTo;
          // db("notification_config")
          //   .where("id_notification_config", id)
          //   .update({ is_enabled_notification_config: setTo })
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          res.status(200).json({ msg: "invalid req body" });
          reject();
        }
        break;

      case "DELETE":
        if (req.query.id) {
          const id = req.query.id;
          // db("notifications")
          //   .where("id_notifications", id)
          //   .del()
          //   .then((data: any) => {
          //     res.status(200).json(data);
          //     resolve(data);
          //   });
        } else {
          res.status(200).json({ msg: "invalid url params" });
          reject();
        }
        break;

      default:
        res.status(500).json({ msg: "not allowed" });
        reject();
    }
  });
}
