import { withSessionRoute } from "@/lib/config/withSession";
import { IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

const VALID_EMAIL = "test@gmail.com";
const VALID_PASSWORD = "password";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(
  req: NextApiRequest & { session: IronSessionData },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const user = {
        username: "ronnie",
        email: "test@gmail.com",
        isAdmin: true,
        isLoggedIn: true,
        avatarUrl: "/profile.png",
        id: 3,
        default_address_users: 1
      };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    }
    return res.status(403).send("");
  }
  return res.status(404).send("");
}
