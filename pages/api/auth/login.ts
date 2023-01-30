import { withSessionRoute } from "@/lib/config/withSession";
import { executeQuery } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { IUser } from "@/models/user.interface";
import useUser from "@/lib/useUser";
import { updateUser } from "@/lib/setters";

// const VALID_EMAIL = "test@gmail.com";
// const VALID_PASSWORD = "password";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req: NextApiRequest, res: NextApiResponse) {
  // const { user, mutateUser, userIsLoading } = useUser();
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {
      const { email, password } = req.body;
      // console.log(email, password);
      // get user from db from pass and username
      try {
        const sql = "SELECT * FROM users WHERE email_users = ?";
        executeQuery(
          { query: sql, values: [email] },
          async (results: IUser[]) => {
            // check if pass is same
            const match = bcrypt.compareSync(
              password,
              results[0].password_users!
            ); // true
            // console.log(match);
            // console.log("login results", results[0]);
            if (match) {
              // login with user
              req.session.user = results[0];
              req.session.user.is_logged_in_users = 1;
              await req.session.save();

              updateUser(results[0].id_users, {is_logged_in_users: 1})
              

              res.json(results[0]);
              resolve(results[0]);
              return;
            } else {
              res.status(403).send("");
              reject();
              return;
            }
          }
        );
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        reject();
        return;
      }
    } else {
      res.status(404).send("");
      reject();
      return;
    }
  });
}
