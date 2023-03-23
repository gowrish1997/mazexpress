import fetchServer from "@/lib/fetchServer";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);
async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        if (req.session.users && req.session.users.length > 0) {
          
            // console.log("sess", req.session.users);

            // return the only user
            const user = await fetchServer(
                `/api/users?id=${req.session.users[0].id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

             console.log("users is", user);
        
            req.session.users = user.data[1];
            const filterUser = [user.data[1]];
            req.session.users = filterUser;

            await req.session.save();

            if (user?.data?.[0]) {
                res.json({ data: user?.data });
            } else {
                res.json(null);
            }
        } else {
            // no users in session
            res.json(null);
        }
    }
}
