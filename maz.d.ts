//==========================
//     written by: raunak
//==========================

import { User } from "./models/user.model";

export {};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    users?: Partial<User>[];
  }
}

declare global {
  interface Window {
    google: any;
  }
}


declare module "jsonwebtoken" {
  interface JwtPayload {
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    email: string;
    email_verified: boolean;
    iss: string;
    nbf: number;
    aud: string;
    sub: string;
    azp: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
window.google = window.google || {};

// for server sign in
namespace NodeJS {
  interface ProcessEnv {


    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    DATABASE_URL: string;

    readonly NEXT_PUBLIC_SERVER_HOST: string;
    readonly NEXT_PUBLIC_SERVER_PORT: string;
    
    readonly NEXT_PUBLIC_C4: string;
  }
}
