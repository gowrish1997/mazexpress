import { withSessionRoute } from "@/lib/config/withSession";
import { updateUser } from "@/lib/setters";
import { NextApiRequest, NextApiResponse } from "next";
export default withSessionRoute(logout);

async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // set logged in false
  await updateUser(req.session.user.id_users, { is_logged_in_users: 0 });
  req.session.destroy();
  res.send({ ok: true });
}
