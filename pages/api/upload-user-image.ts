// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import multiparty from "multiparty";
import fs, { unlink } from "fs";

type Data = {
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // console.log(req)
    const form = new multiparty.Form();
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });

    console.log("req data", data.files, data.fields);
    console.log("req data", util.inspect(data.fields))

    // delete file from public folder
    // let map_path = path.join(
    //   __dirname,
    //   "..",
    //   "..",
    //   "..",
    //   "..",
    //   "public",
    //   "user-images",
    //   data.fields.map_path[0] + ".jpg"
    // );
    // console.log(map_path);
    // await unlink(map_path);

    // create new file
    // map_path = path.join(
    //   __dirname,
    //   "..",
    //   "..",
    //   "..",
    //   "..",
    //   "public",
    //   "maps",
    //   data.fields.map_path[0] + ".jpg"
    // );

    // write file to public/maps with name of path
    // fs.rename(data.files.map_file[0].path, map_path, () => {
    //   console.log(map_path);
    //   // console.log("req data", data.files, data.fields);
    // });

    res.json({ msg: "done" });
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
