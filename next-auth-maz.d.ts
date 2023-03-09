//==========================
//     written by: raunak
//==========================

import { DefaultSession, DefaultUser } from "next-auth";
import type { UserEntity as UserType } from "./lib/adapter/entity/User";
import type { SessionEntity as SessionType } from "./lib/adapter/entity/User";
// for next-auth
declare module "next-auth" {
  interface Session extends SessionType {
    id: string;
    // user: User;
  }

  interface User extends UserType {
    id: string; // Or string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    is_admin: boolean;
  }
}

// for next-auth sign in
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
