import UserContext from "@/components/context/user.context";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { useContext } from "react";

export default async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user = useContext(UserContext)["user"];
    const { setUser } = useContext(UserContext);
    let responseObj = new APIResponse<User>();
    responseObj.data = [user];
    responseObj.msg = "success";
    responseObj.ok = true;
    responseObj.count = 1;
    res.json(responseObj);
  }
}
