import DSContext from '@/lib/adapter/DSContext';
// import { MazAdapter } from "@/lib/adapter";
import { compareSync, hashSync } from "bcrypt";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
// import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import type { NextAuthOptions } from "next-auth";
import { useContext } from "react";

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // console.log("authorize cred", credentials?.username, credentials?.password);
        // let adapter = await MazAdapter();
        // if (adapter) {
        //   const user = await adapter.getUserByEmail(credentials?.username!);
        //   // console.log(user);

        //   if (user) {
        //     // compare password
        //     let match = compareSync(credentials?.password!, user.password!);
        //     console.log(match);
        //     if (match) {
        //       return user;
        //     }
        //   }
        // }
        return null;
      },
    }),
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/gate", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, account, profile, email, credentials);
      // check if credentials
      // let adapter = await MazAdapter();
      // if (adapter) {
      //   const dbuser: UserEntity = await adapter.getUserByEmail(user?.email!);
      //   if (credentials && user) {
      //     // only sign in check
      //     // check the pass
      //     // console.log("return 1");
      //     return true;
      //   } else if (account && account.provider === "google") {
      //     if (dbuser) {
      //       // already stored info in db sign in
      //       // console.log("return 2");
      //       return true;
      //     }

      //     // save new user
      //     const newdbuser = new UserEntity();
      //     const saltRounds = 10;
      //     const hash2 = hashSync("Test123$", saltRounds);

      //     newdbuser.avatar_url = user.image ? user.image : "default_user.png";
      //     newdbuser.first_name = user.name ? user.name.split(" ")[0] : "";
      //     newdbuser.last_name = user.name ? user.name.split(" ")[1] : "";
      //     newdbuser.email = user.email!;

      //     newdbuser.password = hash2;
      //     await adapter.createUser(newdbuser);
      //     // console.log("return 3");
      //     return true;
      //   }
      // }
      // console.log("return 4");
      return false;
    },

    // async redirect({ url, baseUrl }) { return baseUrl },

    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // console.log('session', session)
      // let adapter = await MazAdapter();
      // if (adapter) {
      //   let dbuser = await adapter.getUserByEmail(token.email);
      //   session.user = dbuser;
      //   return session; // The return type will match the one returned in `useSession()`
      // }
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      // let adapter = await MazAdapter();
      // if (adapter) {
      //   let dbuser: UserEntity = await adapter.getUserByEmail(
      //     token.email as string
      //   );
      //   if (isNewUser) {
      //     console.log("new user");
      //     return token;
      //   }
      //   if (dbuser) {
      //     token.is_admin = dbuser.is_admin as boolean;
      //     return token;
      //   } else {
      //     return token;
      //   }
      // }
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  const db = useContext(DSContext)['db']
  if (db !== null){
    req.db = db
  }
  return await NextAuth(req, res, authOptions);
}
