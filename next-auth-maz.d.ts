//==========================
//     written by: raunak
//==========================

export {}


// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User | null;
  }
}


// for server sign in
namespace NodeJS {
  interface ProcessEnv {
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;

    NEXT_PUBLIC_SERVER_HOST: string;
    NEXT_PUBLIC_SERVER_PORT: string;
  }
}
