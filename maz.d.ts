//==========================
//     written by: raunak
//==========================

export {};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User | null;
    // token: string;
    // id: string;
    // is_admin: boolean;
    // email: string;
    // first_name: string;
    // last_name: string;
    // default_address: string;
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
