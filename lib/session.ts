// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  // password: process.env.AUTH_SECRET as string,
  password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
  cookieName: "Maz app cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
