import { withSessionRoute } from "@/lib/config/withSession";
import { updateUser } from "@/lib/setters";
import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
export default withSessionRoute(logout);

async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
  session: IronSession
) {
  // set logged in false
  updateUser(req.session.user.id_users!, { is_logged_in_users: 0 });
  req.session.destroy();
  res.send({ ok: true });
}
