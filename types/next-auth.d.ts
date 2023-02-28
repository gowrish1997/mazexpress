import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserEntity & DefaultSession["user"];

    is_admin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    is_admin: boolean;
  }
}
