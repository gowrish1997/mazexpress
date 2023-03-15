// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const f = require("fs");
const readline = require("readline");
const path = require("node:path");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // maintain file on server for help center data

  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      process.cwd(),
      "lib",
      "config",
      "help-center.txt"
    );

    switch (req.method) {
      case "GET":
        try {
          let obj = {
            name: "",
            email: "",
            num1: "",
            num2: "",
            num3: "",
          };

          //   console.log(filePath);
          var r = readline.createInterface({
            input: f.createReadStream(filePath),
          });
          let counter = 0;
          //   global.helpObj = {
          //     name: "",
          //     email: "",
          //     num1: "",
          //     num2: "",
          //     num3: "",
          //   };

          r.on("line", function (text: string) {
            counter += 1;
            switch (counter) {
              case 1:
                obj.name = text;
                break;
              case 2:
                obj.email = text;
                break;
              case 3:
                obj.num1 = text;
                break;
              case 4:
                obj.num2 = text;
                break;
              case 5:
                obj.num3 = text;
                break;
              default:
                break;
            }
          });
          r.on("close", function () {
            res.json(obj);
            resolve(obj);
          });
        } catch (err) {
          if (err) throw err;
          console.log(err);
          reject();
        }
        break;
      case "PUT":
        // clear file
        f.writeFile(filePath, "", function () {
          console.log("cleared file");
        });
        // write new lines
        // console.log(Object.keys(req.body))
        f.appendFile(
          filePath,
          String(req.body.name_warehouse) + "\n",
          function (err: any) {
            if (err) return console.log(err);
            // console.log("Appended!");
            f.appendFile(
              filePath,
              String(req.body.email_warehouse) + "\n",
              function (err: any) {
                if (err) return console.log(err);
                // console.log("Appended!");
                f.appendFile(
                  filePath,
                  String(req.body.num1_warehouse) + "\n",
                  function (err: any) {
                    if (err) return console.log(err);
                    // console.log("Appended!");
                    f.appendFile(
                      filePath,
                      String(req.body.num2_warehouse) + "\n",
                      function (err: any) {
                        if (err) return console.log(err);
                        // console.log("Appended!");
                        f.appendFile(
                          filePath,
                          String(req.body.num3_warehouse) + "\n",
                          function (err: any) {
                            if (err) return console.log(err);
                            // console.log("Appended!");
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );

        // console.log()
        res.json({ name: "ok" });
        resolve({ name: "ok" });
        break;
      default:
        break;
    }
  });
}
