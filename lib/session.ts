// This is where we specify the typings of req.session.*
// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { IUser } from "@/models/user.interface";

export const sessionOptions: IronSessionOptions = {
  cookieName: "MAZ_COOKIE",
  password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
  // secure: true //should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user: IUser;
  }
}
