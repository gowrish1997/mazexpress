// author: raunak

import { DefaultSession } from "next-auth"
import { User } from "./models/entity/User"


// for next-auth
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User
    }
}

// for next-auth sign in
namespace NodeJS {
    interface ProcessEnv {

        FACEBOOK_ID: string
        FACEBOOK_SECRET: string

        GOOGLE_ID: string
        GOOGLE_SECRET: string

        DATABASE_URL: string
        NEXTAUTH_SECRET: string

        NEXT_PUBLIC_SERVER_HOST: string
        NEXT_PUBLIC_SERVER_PORT: string
    }
}

