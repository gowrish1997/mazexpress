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

    // console.log("req data", data.files, data.fields);
    // console.log("req data", util.inspect(data.fields))

    // if file exists delete file
    let image_path = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "public",
      "user-images",
      data.fields.name[0]
    );
    if (fs.existsSync(image_path)) {
      //file exists
      // delete file from public folder
      unlink(image_path, (err) => {
        if (err) throw err;
        console.log(`${image_path} was deleted`);
      });
    }

    // write file to public/maps with name of path
    fs.rename(data.files.image[0].path, image_path, (err) => {
      if (err) throw err;
      console.log("rename complete!");
    });

    res.status(200).json({ msg: "done" });
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
